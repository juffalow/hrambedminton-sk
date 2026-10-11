import * as cdk from 'aws-cdk-lib';
import { Validations } from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as apigwv2Integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as path from 'path';
import { Construct } from 'constructs';
import { getSuffix } from '../utils';

/** Fixed port of the Claude Code OAuth callback, http://localhost:<port>/callback (claude mcp add --callback-port) */
const CLAUDE_CODE_CALLBACK_PORT = 8976;

/** OAuth callbacks of MCP clients that can connect to the MCP server */
const CALLBACK_URLS = [
  `http://localhost:${CLAUDE_CODE_CALLBACK_PORT}/callback`,
  // claude.ai custom connectors; Anthropic asks to allowlist claude.com too, as the callback may move there
  'https://claude.ai/api/mcp/auth_callback',
  'https://claude.com/api/mcp/auth_callback',
];

/** Scope of the MCP resource server, keep in sync with TOOLS_SCOPE_NAME in src/mcp/auth.ts */
const TOOLS_SCOPE_NAME = 'tools';

export interface McpConstructProps {
  api: appsync.GraphqlApi;
  userPool: cognito.UserPool;
  /** Cognito domain with the hosted sign-in page */
  userPoolDomain: cognito.UserPoolDomain;
}

export class McpConstruct extends Construct {
  public readonly httpApi: apigwv2.HttpApi;
  public readonly mcpClient: cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props: McpConstructProps) {
    super(scope, id);

    const mcpServerLambda = new lambdaNodejs.NodejsFunction(this, 'McpServerLambda', {
      functionName: `HBMcpServer-${getSuffix(this)}`,
      runtime: lambda.Runtime.NODEJS_24_X,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 512,
      // API Gateway cuts the request at ~30s anyway
      timeout: cdk.Duration.seconds(25),
      entry: path.join(__dirname, '../../src/mcp/index.ts'),
      handler: 'handler',
      // The tools call the GraphQL API with the signed-in user's token instead of the table,
      // so they share its resolvers, validation and permissions
      environment: {
        GRAPHQL_URL: props.api.graphqlUrl,
        USER_POOL_ID: props.userPool.userPoolId,
        AUTH_DOMAIN_URL: props.userPoolDomain.baseUrl(),
      },
      logGroup: new logs.LogGroup(this, 'McpServerLogGroup', {
        retention: logs.RetentionDays.TWO_WEEKS,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }),
    });

    // Every MCP request needs a Cognito access token, verified by the Lambda (OAuth discovery routes are public)
    this.httpApi = new apigwv2.HttpApi(this, 'McpHttpApi', {
      apiName: `HBMcpApi-${getSuffix(this)}`,
    });

    const integration = new apigwv2Integrations.HttpLambdaIntegration('McpServerIntegration', mcpServerLambda);

    // ANY so the Lambda can answer GET/DELETE with 405, which MCP clients expect from a stateless server
    this.httpApi.addRoutes({
      path: '/mcp',
      methods: [apigwv2.HttpMethod.ANY],
      integration,
    });

    // OAuth discovery: protected resource metadata (RFC 9728, root and path-suffixed form) and
    // authorization server metadata (RFC 8414) pointing to the Cognito hosted sign-in page
    for (const path of [
      '/.well-known/oauth-protected-resource',
      '/.well-known/oauth-protected-resource/mcp',
      '/.well-known/oauth-authorization-server',
    ]) {
      this.httpApi.addRoutes({ path, methods: [apigwv2.HttpMethod.GET], integration });
    }

    // MCP clients send the MCP server URL as the OAuth "resource" parameter (RFC 8707). Cognito rejects the
    // authorization code with invalid_grant unless the resource is a registered resource server.
    const toolsScope = new cognito.ResourceServerScope({
      scopeName: TOOLS_SCOPE_NAME,
      scopeDescription: 'Use the HramBedminton MCP tools as the signed-in user',
    });
    const resourceServer = props.userPool.addResourceServer('McpResourceServer', {
      identifier: `${this.httpApi.apiEndpoint}/mcp`,
      userPoolResourceServerName: `HBMcp-${getSuffix(this)}`,
      scopes: [toolsScope],
    });

    // Public OAuth client (authorization code + PKCE) for MCP clients: Claude Code and claude.ai.
    // Cognito has no dynamic client registration, so MCP clients are configured with this client ID.
    // The Lambda accepts only access tokens with the tools scope, which only this client can get.
    this.mcpClient = props.userPool.addClient('HBMcpClient', {
      userPoolClientName: `HBMcp-${getSuffix(this)}`,
      generateSecret: false,
      authFlows: {},
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PROFILE,
          cognito.OAuthScope.resourceServer(resourceServer, toolsScope),
        ],
        callbackUrls: CALLBACK_URLS,
      },
      supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.COGNITO],
      accessTokenValidity: cdk.Duration.hours(1),
      idTokenValidity: cdk.Duration.hours(1),
      refreshTokenValidity: cdk.Duration.days(30),
      enableTokenRevocation: true,
      preventUserExistenceErrors: true,
    });

    // Managed login needs a style for each app client that uses it
    const managedLoginBranding = new cognito.CfnManagedLoginBranding(this, 'McpClientManagedLoginBranding', {
      userPoolId: props.userPool.userPoolId,
      clientId: this.mcpClient.userPoolClientId,
      useCognitoProvidedValues: true,
    });
    // Keep the logical ID from when it was created in AuthConstruct: a client can have only one style, so a new
    // logical ID would make CloudFormation create a second one before deleting the old one (AlreadyExists)
    managedLoginBranding.overrideLogicalId('HBAuthConstructHBMcpClientManagedLoginBranding838892AB');

    const defaultStage = this.httpApi.defaultStage?.node.defaultChild as apigwv2.CfnStage;
    defaultStage.defaultRouteSettings = {
      throttlingRateLimit: 10,
      throttlingBurstLimit: 20,
    };

    // Access logs of the public MCP endpoint, to investigate abuse. They contain client IP addresses,
    // so they are kept only for two weeks.
    const accessLogGroup = new logs.LogGroup(this, 'McpHttpApiAccessLogGroup', {
      retention: logs.RetentionDays.TWO_WEEKS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    defaultStage.accessLogSettings = {
      destinationArn: accessLogGroup.logGroupArn,
      format: JSON.stringify({
        requestId: '$context.requestId',
        ip: '$context.identity.sourceIp',
        userAgent: '$context.identity.userAgent',
        requestTime: '$context.requestTime',
        routeKey: '$context.routeKey',
        status: '$context.status',
        responseLength: '$context.responseLength',
        integrationError: '$context.integrationErrorMessage',
      }),
    };

    Validations.of(this.httpApi).acknowledge({
      id: 'AwsSolutions-APIG4',
      reason:
        'The Lambda verifies the Cognito access token of every MCP request: an API Gateway JWT authorizer cannot ' +
        'return the WWW-Authenticate resource_metadata header MCP clients need. OAuth discovery routes are public.',
    });
    Validations.of(mcpServerLambda).acknowledge({
      id: 'AwsSolutions-IAM4[Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole]',
      reason: 'AWS managed policy that only allows writing the function logs to CloudWatch.',
    });

    new cdk.CfnOutput(this, 'McpServerUrl', {
      value: `${this.httpApi.apiEndpoint}/mcp`,
      description: 'MCP server endpoint (Streamable HTTP)',
    });

    new cdk.CfnOutput(this, 'McpClientId', {
      value: this.mcpClient.userPoolClientId,
      description: 'OAuth client ID for MCP clients (claude.ai: connector Advanced settings, no client secret)',
    });

    new cdk.CfnOutput(this, 'McpClaudeCodeCommand', {
      value:
        `claude mcp add --transport http --client-id ${this.mcpClient.userPoolClientId} ` +
        `--callback-port ${CLAUDE_CODE_CALLBACK_PORT} hrambedminton ${this.httpApi.apiEndpoint}/mcp`,
      description: 'Adds the MCP server to Claude Code',
    });
  }
}

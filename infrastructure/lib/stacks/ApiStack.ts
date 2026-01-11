import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export interface ApiStackProps extends cdk.StackProps {
  userPool: cognito.UserPool;
  table: dynamodb.Table;
}

export class ApiStack extends cdk.Stack {
  public readonly api: appsync.GraphqlApi;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    this.api = new appsync.GraphqlApi(this, 'HramBedmintonApi', {
      name: 'HramBedmintonApi',
      definition: appsync.Definition.fromSchema(
        appsync.SchemaFile.fromAsset('lib/graphql/schema.graphql'),
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: props.userPool,
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.API_KEY,
            apiKeyConfig: {
              expires: cdk.Expiration.after(cdk.Duration.days(365)),
            },
          },
        ],
      },
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ERROR,
        retention: logs.RetentionDays.TWO_WEEKS,
      },
      xrayEnabled: false,
    });

    const dynamoDbDataSource = this.api.addDynamoDbDataSource(
      'DynamoDbDataSource',
      props.table,
    );

    const createGuestEventFunction = new appsync.AppsyncFunction(
      this,
      'CreateGuestEventFunction',
      {
        name: 'createGuestEvent',
        api: this.api,
        dataSource: dynamoDbDataSource,
        code: appsync.Code.fromAsset('lib/graphql/resolvers/createGuestEvent.js'),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
      },
    );

    new appsync.Resolver(this, 'CreateGuestEventResolver', {
      api: this.api,
      typeName: 'Mutation',
      fieldName: 'createGuestEvent',
      code: appsync.Code.fromInline(`
        export function request(ctx) {
          ctx.stash.tableName = "${props.table.tableName}";
          return {};
        }
        export function response(ctx) {
          return ctx.prev.result;
        }
      `),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [createGuestEventFunction],
    });

    const getEventFunction = new appsync.AppsyncFunction(
      this,
      'GetEventFunction',
      {
        name: 'getEvent',
        api: this.api,
        dataSource: dynamoDbDataSource,
        code: appsync.Code.fromAsset('lib/graphql/resolvers/getEvent.js'),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
      },
    );

    new appsync.Resolver(this, 'GetEventResolver', {
      api: this.api,
      typeName: 'Query',
      fieldName: 'event',
      code: appsync.Code.fromInline(`
        export function request(ctx) {
          return {};
        }
        export function response(ctx) {
          return ctx.prev.result;
        }
      `),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [getEventFunction],
    });
  }
}

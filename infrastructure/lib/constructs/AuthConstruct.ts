import * as cdk from 'aws-cdk-lib';
import { Validations } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { Construct } from 'constructs';
import { getSuffix } from '../utils';
import { tableIndexesNagFindingId } from './DatabaseConstruct';

export interface AuthConstructProps {
  table: dynamodb.Table;
}

export class AuthConstruct extends Construct {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;
  public readonly userPoolDomain: cognito.UserPoolDomain;

  constructor(scope: Construct, id: string, props: AuthConstructProps) {
    super(scope, id);

    this.userPool = new cognito.UserPool(this, 'HramBedmintonUserPool', {
      userPoolName: `HBUserPool-${getSuffix(this)}`,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        username: false,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        fullname: {
          required: true,
          mutable: true,
        },
      },
      mfa: cognito.Mfa.OPTIONAL,
      mfaSecondFactor: {
        sms: false,
        otp: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
        tempPasswordValidity: cdk.Duration.days(7),
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const postConfirmationLambda = new lambdaNodejs.NodejsFunction(this, 'PostConfirmationLambda', {
      functionName: `HBPostConfirmation-${getSuffix(this)}`,
      runtime: lambda.Runtime.NODEJS_24_X,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      entry: path.join(__dirname, '../lambdas/post-confirmation.ts'),
      handler: 'handler',
      environment: {
        TABLE_NAME: props.table.tableName,
      },
    });

    props.table.grantWriteData(postConfirmationLambda);

    Validations.of(postConfirmationLambda).acknowledge({
      id: 'AwsSolutions-IAM4[Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole]',
      reason: 'AWS managed policy that only allows writing the function logs to CloudWatch.',
    });
    Validations.of(postConfirmationLambda).acknowledge({
      id: tableIndexesNagFindingId(props.table),
      reason: 'Added by table.grantWriteData() for the indexes of this table only.',
    });
    Validations.of(this.userPool).acknowledge({
      id: 'AwsSolutions-COG8',
      reason: 'Deferred: Cognito Plus feature plan (threat protection) is billed per active user. Revisit with more users.',
    });
    Validations.of(this.userPool).acknowledge({
      id: 'AwsSolutions-COG2',
      reason: 'MFA (TOTP) is optional on purpose: required MFA is too much friction for a casual sports app.',
    });

    this.userPool.addTrigger(cognito.UserPoolOperation.POST_CONFIRMATION, postConfirmationLambda);

    this.userPoolClient = this.userPool.addClient('HBUserPoolClient', {
      userPoolClientName: `HBWebApp-${getSuffix(this)}`,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      generateSecret: false,
      preventUserExistenceErrors: true,
    });

    // Hosted sign-in page used by OAuth clients (MCP clients, see McpConstruct), the webapp keeps its own sign-in form
    this.userPoolDomain = this.userPool.addDomain('HBUserPoolDomain', {
      cognitoDomain: {
        domainPrefix: `hrambedminton-${getSuffix(this)}`,
      },
      managedLoginVersion: cognito.ManagedLoginVersion.NEWER_MANAGED_LOGIN,
    });
  }
}

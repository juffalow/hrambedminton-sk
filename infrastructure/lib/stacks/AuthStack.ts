import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';

export interface AuthStackProps extends cdk.StackProps {
  table: dynamodb.Table;
}

export class AuthStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props: AuthStackProps) {
    super(scope, id, props);

    this.userPool = new cognito.UserPool(this, 'HramBedmintonUserPool', {
      userPoolName: 'HramBedmintonUserPool',
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

    const postConfirmationLambda = new lambdaNodejs.NodejsFunction(
      this,
      'PostConfirmationLambda',
      {
        functionName: 'HramBedmintonPostConfirmation',
        runtime: lambda.Runtime.NODEJS_24_X,
        architecture: lambda.Architecture.ARM_64,
        memorySize: 256,
        timeout: cdk.Duration.seconds(10),
        entry: path.join(__dirname, '../lambdas/post-confirmation.ts'),
        handler: 'handler',
        environment: {
          TABLE_NAME: props.table.tableName,
        },
      },
    );

    props.table.grantWriteData(postConfirmationLambda);

    this.userPool.addTrigger(
      cognito.UserPoolOperation.POST_CONFIRMATION,
      postConfirmationLambda,
    );

    this.userPoolClient = this.userPool.addClient('HramBedmintonUserPoolClient', {
      userPoolClientName: 'HramBedmintonWebApp',
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      generateSecret: false,
      preventUserExistenceErrors: true,
    });
  }
}

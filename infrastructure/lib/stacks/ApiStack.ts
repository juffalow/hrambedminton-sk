import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import * as path from 'path';

interface ApiStackProps extends cdk.StackProps {
  table: dynamodb.ITable;
}

export class ApiStack extends cdk.Stack {
  public readonly api: appsync.GraphqlApi;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    this.api = new appsync.GraphqlApi(this, 'HramBedmintonApi', {
      name: 'HramBedmintonApi',
      definition: appsync.Definition.fromFile(
        path.join(__dirname, '../graphql/schema.graphql')
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ERROR,
      },
      xrayEnabled: true,
    });

    const dataSource = this.api.addDynamoDbDataSource(
      'HramBedmintonDataSource',
      props.table
    );

    const resolversPath = path.join(__dirname, '../graphql/resolvers');

    // Query resolvers
    dataSource.createResolver('GetUserResolver', {
      typeName: 'Query',
      fieldName: 'getUser',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join(resolversPath, 'getUser.js')),
    });

    dataSource.createResolver('GetEventResolver', {
      typeName: 'Query',
      fieldName: 'getEvent',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join(resolversPath, 'getEvent.js')),
    });

    dataSource.createResolver('ListUserEventsResolver', {
      typeName: 'Query',
      fieldName: 'listUserEvents',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join(resolversPath, 'listUserEvents.js')),
    });

    // Mutation resolvers
    dataSource.createResolver('CreateUserResolver', {
      typeName: 'Mutation',
      fieldName: 'createUser',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join(resolversPath, 'createUser.js')),
    });

    dataSource.createResolver('CreateEventResolver', {
      typeName: 'Mutation',
      fieldName: 'createEvent',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join(resolversPath, 'createEvent.js')),
    });

    dataSource.createResolver('ListUpcomingEventsResolver', {
      typeName: 'Query',
      fieldName: 'listUpcomingEvents',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        path.join(resolversPath, 'listUpcomingEvents.js')
      ),
    });

    dataSource.createResolver('UpdateEventResolver', {
      typeName: 'Mutation',
      fieldName: 'updateEvent',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join(resolversPath, 'updateEvent.js')),
    });

    dataSource.createResolver('DeleteEventResolver', {
      typeName: 'Mutation',
      fieldName: 'deleteEvent',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join(resolversPath, 'deleteEvent.js')),
    });

    dataSource.createResolver('AddPlayerResolver', {
      typeName: 'Mutation',
      fieldName: 'addPlayer',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join(resolversPath, 'addPlayer.js')),
    });

    dataSource.createResolver('RemovePlayerResolver', {
      typeName: 'Mutation',
      fieldName: 'removePlayer',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(path.join(resolversPath, 'removePlayer.js')),
    });

    dataSource.createResolver('UpdatePlayerStatusResolver', {
      typeName: 'Mutation',
      fieldName: 'updatePlayerStatus',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        path.join(resolversPath, 'updatePlayerStatus.js')
      ),
    });

    new cdk.CfnOutput(this, 'GraphQLApiUrl', {
      value: this.api.graphqlUrl,
      description: 'GraphQL API URL',
    });

    new cdk.CfnOutput(this, 'GraphQLApiKey', {
      value: this.api.apiKey || '',
      description: 'GraphQL API Key',
    });

    new cdk.CfnOutput(this, 'GraphQLApiId', {
      value: this.api.apiId,
      description: 'GraphQL API ID',
    });
  }
}

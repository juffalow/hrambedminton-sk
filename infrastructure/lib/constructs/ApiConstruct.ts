import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { getSuffix } from '../utils';

export interface ApiConstructProps {
  userPool: cognito.UserPool;
  table: dynamodb.Table;
}

export class ApiConstruct extends Construct {
  public readonly api: appsync.GraphqlApi;

  constructor(scope: Construct, id: string, props: ApiConstructProps) {
    super(scope, id);

    this.api = new appsync.GraphqlApi(this, 'HBApi', {
      name: `HBApi-${getSuffix(this)}`,
      definition: appsync.Definition.fromSchema(appsync.SchemaFile.fromAsset('lib/graphql/schema.graphql')),
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
      environmentVariables: {
        TABLE_NAME: props.table.tableName,
      },
    });

    const tableDataSource = this.api.addDynamoDbDataSource('HBTableDataSource', props.table);

    tableDataSource.createResolver('MutationCreateGuestEventResolver', {
      typeName: 'Mutation',
      fieldName: 'createGuestEvent',
      code: appsync.Code.fromAsset('lib/graphql/resolvers/Mutation.createGuestEvent.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    const getCurrentUserFunction = new appsync.AppsyncFunction(this, 'GetCurrentUserFunction', {
      name: 'getCurrentUser',
      api: this.api,
      dataSource: tableDataSource,
      code: appsync.Code.fromAsset('lib/graphql/resolvers/functions/getCurrentUser.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    const createEventFunction = new appsync.AppsyncFunction(this, 'CreateEventFunction', {
      name: 'createEvent',
      api: this.api,
      dataSource: tableDataSource,
      code: appsync.Code.fromAsset('lib/graphql/resolvers/functions/createEvent.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    new appsync.Resolver(this, 'MutationCreateEventResolver', {
      api: this.api,
      typeName: 'Mutation',
      fieldName: 'createEvent',
      code: appsync.Code.fromAsset('lib/graphql/resolvers/Mutation.createEvent.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [getCurrentUserFunction, createEventFunction],
    });

    new appsync.Resolver(this, 'QueryMeResolver', {
      api: this.api,
      typeName: 'Query',
      fieldName: 'me',
      code: appsync.Code.fromAsset('lib/graphql/resolvers/Query.me.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [getCurrentUserFunction],
    });

    const queryUserEventPlayersFunction = new appsync.AppsyncFunction(this, 'QueryUserEventPlayersFunction', {
      name: 'queryUserEventPlayers',
      api: this.api,
      dataSource: tableDataSource,
      code: appsync.Code.fromAsset('lib/graphql/resolvers/functions/queryUserEventPlayers.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    const batchGetEventsFunction = new appsync.AppsyncFunction(this, 'BatchGetEventsFunction', {
      name: 'batchGetEvents',
      api: this.api,
      dataSource: tableDataSource,
      code: appsync.Code.fromAsset('lib/graphql/resolvers/functions/batchGetEvents.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    new appsync.Resolver(this, 'UserEventsResolver', {
      api: this.api,
      typeName: 'User',
      fieldName: 'events',
      code: appsync.Code.fromAsset('lib/graphql/resolvers/User.events.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [queryUserEventPlayersFunction, batchGetEventsFunction],
    });

    tableDataSource.createResolver('QueryEventResolver', {
      typeName: 'Query',
      fieldName: 'event',
      code: appsync.Code.fromAsset('lib/graphql/resolvers/Query.event.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    tableDataSource.createResolver('QueryEventsResolver', {
      typeName: 'Query',
      fieldName: 'events',
      code: appsync.Code.fromAsset('lib/graphql/resolvers/Query.events.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    tableDataSource.createResolver('EventPlayersResolver', {
      typeName: 'Event',
      fieldName: 'players',
      code: appsync.Code.fromAsset('lib/graphql/resolvers/Event.players.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });
  }
}

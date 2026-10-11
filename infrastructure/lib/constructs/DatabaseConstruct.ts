import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cdk from 'aws-cdk-lib';
import { CfnElement, Stack, Validations } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { getSuffix } from '../utils';

/**
 * cdk-nag finding for the `<table ARN>/index/*` wildcard that table.grant*() adds so a role can query the indexes
 */
export function tableIndexesNagFindingId(table: dynamodb.Table): string {
  const logicalId = Stack.of(table).getLogicalId(table.node.defaultChild as CfnElement);

  return `AwsSolutions-IAM5[Resource::<${logicalId}.Arn>/index/*]`;
}

export class DatabaseConstruct extends Construct {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new dynamodb.Table(this, 'HBTable', {
      tableName: `HBTable-${getSuffix(this)}`,
      partitionKey: {
        name: 'PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // All items of one entity type (type#user, type#event, type#eventPlayer), sorted by date. Used for listing.
    this.table.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: {
        name: 'GSI1PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI1SK',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // Relations: events of an owner (owner#<id>) and events of a player (user#<id>, email#<email>)
    this.table.addGlobalSecondaryIndex({
      indexName: 'GSI2',
      partitionKey: {
        name: 'GSI2PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI2SK',
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    Validations.of(this.table).acknowledge({
      id: 'AwsSolutions-DDB3',
      reason:
        'Point-in-time recovery deliberately not enabled yet (decided 2026-10-11). Revisit before real user data.',
    });

    new cdk.CfnOutput(this, 'TableName', {
      value: this.table.tableName,
      description: 'DynamoDB table name',
    });

    new cdk.CfnOutput(this, 'TableArn', {
      value: this.table.tableArn,
      description: 'DynamoDB table ARN',
    });
  }
}

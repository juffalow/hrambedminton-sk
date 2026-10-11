import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiConstruct } from '../constructs/ApiConstruct';
import { AuthConstruct } from '../constructs/AuthConstruct';
import { DatabaseConstruct } from '../constructs/DatabaseConstruct';
import { McpConstruct } from '../constructs/McpConstruct';

export interface HBBackendProps extends StackProps {
  stage?: string;
}

export class HBBackend extends Stack {
  constructor(scope: Construct, id: string, props: HBBackendProps) {
    super(scope, id, props);

    const database = new DatabaseConstruct(this, 'HBDatabaseConstruct');

    const auth = new AuthConstruct(this, 'HBAuthConstruct', {
      table: database.table,
    });

    const api = new ApiConstruct(this, 'HBApiConstruct', {
      userPool: auth.userPool,
      table: database.table,
    });

    new McpConstruct(this, 'HBMcpConstruct', {
      api: api.api,
      userPool: auth.userPool,
      userPoolDomain: auth.userPoolDomain,
    });
  }
}

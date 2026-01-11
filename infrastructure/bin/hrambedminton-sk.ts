#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { ApiStack } from '../lib/stacks/ApiStack';
import { AuthStack } from '../lib/stacks/AuthStack';
import { DatabaseStack } from '../lib/stacks/DatabaseStack';

const app = new cdk.App();
const databaseStack = new DatabaseStack(app, 'HBDatabaseStack', {});
const authStack = new AuthStack(app, 'HBAuthStack', {
  table: databaseStack.table,
});
new ApiStack(app, 'HBApiStack', {
  userPool: authStack.userPool,
  table: databaseStack.table,
});

Tags.of(app).add('project', 'hrambedminton-sk');

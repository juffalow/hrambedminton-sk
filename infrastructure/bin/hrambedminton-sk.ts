#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { DatabaseStack } from '../lib/stacks/DatabaseStack';
import { ApiStack } from '../lib/stacks/ApiStack';

const app = new cdk.App();

const databaseStack = new DatabaseStack(app, 'DatabaseStack', {});

new ApiStack(app, 'ApiStack', {
  table: databaseStack.table,
});

Tags.of(app).add('project', 'hrambedminton-sk');

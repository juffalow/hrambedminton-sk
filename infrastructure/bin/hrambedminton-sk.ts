#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { AuthStack } from '../lib/stacks/AuthStack';
import { DatabaseStack } from '../lib/stacks/DatabaseStack';

const app = new cdk.App();
new AuthStack(app, 'AuthStack', {});
new DatabaseStack(app, 'DatabaseStack', {});

Tags.of(app).add('project', 'hrambedminton-sk');

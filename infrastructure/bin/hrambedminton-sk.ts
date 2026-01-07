#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { DatabaseStack } from '../lib/stacks/DatabaseStack';

const app = new cdk.App();
new DatabaseStack(app, 'DatabaseStack', {});

Tags.of(app).add('project', 'hrambedminton-sk');

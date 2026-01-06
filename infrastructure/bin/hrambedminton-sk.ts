#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EmptyStack } from '../lib/stacks/EmptyStack';
import { Tags } from 'aws-cdk-lib';

const app = new cdk.App();
new EmptyStack(app, 'EmptyStack', {});

Tags.of(app).add('project', 'hrambedminton-sk');

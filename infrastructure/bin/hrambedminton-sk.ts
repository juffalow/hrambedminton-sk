#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Tags, Validations } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { HBBackend } from '../lib/stacks/HBBackend';
import { HBCertificate } from '../lib/stacks/HBCertificate';
import { HBWebapp } from '../lib/stacks/HBWebapp';
import { HBCiCd } from '../lib/stacks/HBCiCd';

const app = new cdk.App();

const stage = app.node.tryGetContext('stage') as string;

const env = {
  account: app.node.tryGetContext('environment')[stage].account.id,
  region: app.node.tryGetContext('environment')[stage].account.region,
};

new HBBackend(app, 'HBBackendStack', {
  env,
  description: 'Hram Bedminton Backend Stack',
  stage,
});

const certificateStack =
  stage === 'production'
    ? new HBCertificate(app, 'HBCertificateStack', {
        env: {
          account: env.account,
          region: 'us-east-1',
        },
        crossRegionReferences: true,
        description: 'HramBedminton Certificate Stack (us-east-1, required by CloudFront)',
        domainName: 'hrambedminton.sk',
        subjectAlternativeNames: ['www.hrambedminton.sk'],
      })
    : undefined;

const webapp = new HBWebapp(app, 'HBWebappStack', {
  env,
  description: 'Hram Bedminton Webapp Stack',
  stage,
  certificate: certificateStack?.webappCertificate,
});

new HBCiCd(app, 'HBCiCdStack', {
  env,
  description: 'Hram Bedminton CI/CD Stack',
  githubOidcProviderArn: app.node.tryGetContext('environment')[stage].oidc.GitHubProviderArn,
  webappConstruct: webapp.webapp,
});

Tags.of(app).add('project', 'hrambedminton-sk');
Tags.of(app).add('stage', stage);

// Security best practice checks (AWS Solutions rule pack) during synth: errors fail the synth,
// findings are fixed or suppressed with a reason (NagSuppressions)
Validations.of(app).addPlugins(new AwsSolutionsChecks(app, { verbose: true }));

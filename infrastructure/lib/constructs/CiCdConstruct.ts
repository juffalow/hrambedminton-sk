import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import type { WebappConstruct } from './WebappConstruct';
import { getSuffix } from '../utils';

interface CiCdConstructProps {
  githubOidcProviderArn: string;
  webappConstruct: WebappConstruct;
}

export class CiCdConstruct extends Construct {
  public readonly githubActionsCdkDeploymentRole: iam.Role;
  public readonly githubActionsWebappDeploymentRole: iam.Role;

  constructor(scope: Construct, id: string, props: CiCdConstructProps) {
    super(scope, id);

    const account = cdk.Stack.of(this).account;
    const region = cdk.Stack.of(this).region;

    this.githubActionsCdkDeploymentRole = new iam.Role(this, 'HBGitHubActionsCdkDeploymentRole', {
      assumedBy: new iam.WebIdentityPrincipal(props.githubOidcProviderArn, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': 'repo:juffalow/hrambedminton-sk:*',
        },
      }),
      roleName: `hb-github-actions-cdk-deployment-role-${getSuffix(this)}`,
      inlinePolicies: {
        'hb-github-actions-cdk-deployment-policy': new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              sid: 'AssumeCdkBootstrapRoles',
              effect: iam.Effect.ALLOW,
              actions: ['sts:AssumeRole'],
              resources: [
                `arn:aws:iam::${account}:role/cdk-hnb659fds-deploy-role-${account}-us-east-1`,
                `arn:aws:iam::${account}:role/cdk-hnb659fds-file-publishing-role-${account}-us-east-1`,
                `arn:aws:iam::${account}:role/cdk-hnb659fds-lookup-role-${account}-us-east-1`,
                `arn:aws:iam::${account}:role/cdk-hnb659fds-image-publishing-role-${account}-us-east-1`,
                `arn:aws:iam::${account}:role/cdk-hnb659fds-deploy-role-${account}-${region}`,
                `arn:aws:iam::${account}:role/cdk-hnb659fds-file-publishing-role-${account}-${region}`,
                `arn:aws:iam::${account}:role/cdk-hnb659fds-lookup-role-${account}-${region}`,
                `arn:aws:iam::${account}:role/cdk-hnb659fds-image-publishing-role-${account}-${region}`,
              ],
            }),
            new iam.PolicyStatement({
              sid: 'CloudFormationDeploy',
              effect: iam.Effect.ALLOW,
              actions: [
                'cloudformation:CreateChangeSet',
                'cloudformation:DescribeChangeSet',
                'cloudformation:ExecuteChangeSet',
                'cloudformation:DeleteChangeSet',
                'cloudformation:DescribeStacks',
                'cloudformation:DescribeStackEvents',
                'cloudformation:DescribeStackResources',
                'cloudformation:GetTemplate',
              ],
              resources: [
                `arn:aws:cloudformation:us-east-1:${account}:stack/HB*/*`,
                `arn:aws:cloudformation:${region}:${account}:stack/HB*/*`,
              ],
            }),
            new iam.PolicyStatement({
              sid: 'ReadCdkBootstrapVersion',
              effect: iam.Effect.ALLOW,
              actions: ['ssm:GetParameter'],
              resources: [
                `arn:aws:ssm:us-east-1:${account}:parameter/cdk-bootstrap/*/version`,
                `arn:aws:ssm:${region}:${account}:parameter/cdk-bootstrap/*/version`,
              ],
            }),
          ],
        }),
      },
    });

    new cdk.CfnOutput(this, 'GitHubActionsCdkDeploymentRoleArn', {
      value: this.githubActionsCdkDeploymentRole.roleArn,
    });

    this.githubActionsWebappDeploymentRole = new iam.Role(this, `HBGitHubActionsWebappDeploymentRole`, {
      assumedBy: new iam.WebIdentityPrincipal(props.githubOidcProviderArn, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': 'repo:juffalow/hrambedminton-sk:*',
        },
      }),
      roleName: `hb-github-actions-webapp-deployment-role-${getSuffix(this)}`,
      inlinePolicies: {
        'hb-github-actions-webapp-deployment-policy': new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: ['s3:PutObject', 's3:GetObject', 's3:ListBucket', 's3:DeleteObject'],
              resources: [props.webappConstruct.bucket.bucketArn, `${props.webappConstruct.bucket.bucketArn}/*`],
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: ['cloudfront:CreateInvalidation'],
              resources: [props.webappConstruct.distribution.distributionArn],
            }),
          ],
        }),
      },
    });

    new cdk.CfnOutput(this, 'GitHubActionsWebappDeploymentRoleArn', {
      value: this.githubActionsWebappDeploymentRole.roleArn,
    });
  }
}

import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CiCdConstruct } from '../constructs/CiCdConstruct';
import type { WebappConstruct } from '../constructs/WebappConstruct';

interface HBCiCdProps extends StackProps {
  githubOidcProviderArn: string;
  webappConstruct: WebappConstruct;
}

export class HBCiCd extends Stack {
  constructor(scope: Construct, id: string, props: HBCiCdProps) {
    super(scope, id, props);

    new CiCdConstruct(this, 'HBCiCdConstruct', {
      githubOidcProviderArn: props.githubOidcProviderArn,
      webappConstruct: props.webappConstruct,
    });
  }
}

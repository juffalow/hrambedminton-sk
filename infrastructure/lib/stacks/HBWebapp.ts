import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WebappConstruct } from '../constructs/WebappConstruct';

interface PTLFrontendProps extends StackProps {
  stage?: string;
  certificate?: acm.ICertificate;
}

export class HBWebapp extends Stack {
  public readonly webapp: WebappConstruct;

  constructor(scope: Construct, id: string, props: PTLFrontendProps) {
    super(scope, id, props);

    this.webapp = new WebappConstruct(this, 'PTLWebAppConstruct', {
      stage: props.stage,
      certificate: props.certificate,
    });
  }
}

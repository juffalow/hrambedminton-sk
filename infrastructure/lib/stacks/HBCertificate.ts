import { Stack, StackProps } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

interface PTLCertificateProps extends StackProps {
  domainName: string;
  subjectAlternativeNames?: string[];
}

export class HBCertificate extends Stack {
  public readonly webappCertificate: acm.Certificate;

  constructor(scope: Construct, id: string, props: PTLCertificateProps) {
    super(scope, id, props);

    const hostedZone = route53.HostedZone.fromLookup(this, 'HBHostedZone', {
      domainName: props.domainName,
    });

    this.webappCertificate = new acm.Certificate(this, 'HBWebAppCertificate', {
      domainName: props.domainName,
      subjectAlternativeNames: props.subjectAlternativeNames,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });
  }
}

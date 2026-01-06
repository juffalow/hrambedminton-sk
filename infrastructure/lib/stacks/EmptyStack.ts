import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface EmptyStackProps extends cdk.StackProps {
}

export class EmptyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EmptyStackProps) {
    super(scope, id, props);
  }
}

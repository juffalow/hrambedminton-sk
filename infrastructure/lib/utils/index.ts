import { Stack, Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export function getSuffix(scope: Construct): string {
  const stack = Stack.of(scope);
  const shortStackId = Fn.select(2, Fn.split('/', stack.stackId));

  return Fn.select(4, Fn.split('-', shortStackId));
}

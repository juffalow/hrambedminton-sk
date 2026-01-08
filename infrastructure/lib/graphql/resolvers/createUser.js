import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { input } = ctx.args;
  const now = util.time.nowISO8601();

  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({
      PK: `user#${input.id}`,
      SK: `user#${input.id}`,
    }),
    attributeValues: util.dynamodb.toMapValues({
      Type: 'User',
      id: input.id,
      email: input.email,
      name: input.name,
      createdAt: now,
    }),
    condition: {
      expression: 'attribute_not_exists(PK)',
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    if (ctx.error.type === 'DynamoDB:ConditionalCheckFailedException') {
      util.error('User already exists', 'UserAlreadyExists');
    }
    util.error(ctx.error.message, ctx.error.type);
  }

  return {
    id: ctx.result.id,
    email: ctx.result.email,
    name: ctx.result.name,
    createdAt: ctx.result.createdAt,
  };
}

import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { id } = ctx.args;
  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({
      PK: `user#${id}`,
      SK: `user#${id}`,
    }),
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  const item = ctx.result;
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    email: item.email,
    name: item.name,
    createdAt: item.createdAt,
  };
}

import { util } from '@aws-appsync/utils';

/**
 * Loads the signed-in user (Cognito user pool identity) from the table into ctx.stash.user.
 * The User item is created by the post-confirmation Lambda when the user signs up.
 */
export function request(ctx) {
  const userId = ctx.identity && ctx.identity.sub;

  if (!userId) {
    util.unauthorized();
  }

  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({
      PK: `user#${userId}`,
      SK: `user#${userId}`,
    }),
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  if (!ctx.result || ctx.result.Type !== 'User') {
    util.error('User not found', 'NotFoundError');
  }

  ctx.stash.user = ctx.result;

  return ctx.result;
}

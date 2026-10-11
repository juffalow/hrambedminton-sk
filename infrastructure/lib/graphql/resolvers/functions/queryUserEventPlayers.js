import { util } from '@aws-appsync/utils';

/**
 * Reads one page of the user's EventPlayer items from GSI2 (GSI2PK user#<userId>), within the sort key
 * range prepared in ctx.stash.userEvents by the User.events resolver. Stores the page and whether there is
 * another one back in ctx.stash.userEvents.
 */
export function request(ctx) {
  const { userId, lower, upper, pageSize, cursorKey } = ctx.stash.userEvents;

  return {
    operation: 'Query',
    index: 'GSI2',
    query: {
      expression: 'GSI2PK = :pk AND GSI2SK BETWEEN :lower AND :upper',
      expressionValues: util.dynamodb.toMapValues({
        ':pk': `user#${userId}`,
        ':lower': lower,
        ':upper': upper,
      }),
    },
    scanIndexForward: true,
    // One extra item tells if there is another page, one more for the cursor item itself
    limit: pageSize + (cursorKey ? 2 : 1),
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  const { pageSize, cursorKey } = ctx.stash.userEvents;
  let items = ctx.result.items || [];

  if (cursorKey && items.length > 0 && items[0].GSI2SK === cursorKey) {
    items = items.slice(1);
  }

  // nextToken without the extra item means DynamoDB stopped at its 1 MB page limit, so more may exist
  ctx.stash.userEvents.hasNextPage = items.length > pageSize || !!ctx.result.nextToken;
  ctx.stash.userEvents.players = items.slice(0, pageSize);

  return ctx.stash.userEvents.players;
}

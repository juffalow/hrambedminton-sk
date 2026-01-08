import { util } from '@aws-appsync/utils';

// Function 1: Query EventPlayer records to get event IDs
export function request(ctx) {
  const { userId, first = 20, after } = ctx.args;

  const query = {
    operation: 'Query',
    index: 'GSI1',
    query: {
      expression: 'GSI1PK = :pk AND begins_with(GSI1SK, :sk)',
      expressionValues: util.dynamodb.toMapValues({
        ':pk': `user#${userId}`,
        ':sk': 'event#',
      }),
    },
    scanIndexForward: false,
    limit: first + 1,
  };

  if (after) {
    const cursor = JSON.parse(util.base64Decode(after));
    query.exclusiveStartKey = util.dynamodb.toMapValues(cursor);
  }

  return query;
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  const items = ctx.result.items || [];
  const { first = 20 } = ctx.args;

  const hasNextPage = items.length > first;
  const resultItems = items.slice(0, first);

  // Extract event IDs from PK (format: event#<eventId>)
  const eventIds = resultItems.map((item) => item.PK.replace('event#', ''));

  // Store pagination info and player data for next function
  const lastItem = resultItems[resultItems.length - 1];

  return {
    eventIds,
    playerItems: resultItems,
    hasNextPage,
    hasPreviousPage: !!ctx.args.after,
    lastItem,
  };
}

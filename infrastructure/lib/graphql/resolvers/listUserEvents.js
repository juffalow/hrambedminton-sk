import { util } from '@aws-appsync/utils';

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
    query.nextToken = after;
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
  const edges = items.slice(0, first).map((item) => ({
    node: {
      id: item.id,
      eventType: item.eventType,
      name: item.name,
      description: item.description,
      date: item.date,
      time: item.time,
      maxPlayers: item.maxPlayers,
      place: item.place,
      court: item.court,
      ownerId: item.ownerId,
      createdAt: item.createdAt,
    },
    cursor: util.base64Encode(JSON.stringify({ PK: item.PK, SK: item.SK })),
  }));

  return {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage: !!ctx.args.after,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    },
    totalCount: null,
  };
}

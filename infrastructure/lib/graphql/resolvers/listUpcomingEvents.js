import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { first = 20, after } = ctx.args;
  const today = util.time.nowFormatted('yyyy-MM-dd');

  const query = {
    operation: 'Scan',
    filter: {
      expression: '#type = :type AND #date >= :today',
      expressionNames: {
        '#type': 'Type',
        '#date': 'date',
      },
      expressionValues: util.dynamodb.toMapValues({
        ':type': 'Event',
        ':today': today,
      }),
    },
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

  // Sort by date and time
  items.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });

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

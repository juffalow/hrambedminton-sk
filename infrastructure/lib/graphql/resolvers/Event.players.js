import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const eventId = ctx.source._id;

  return {
    operation: 'Query',
    query: {
      expression: 'PK = :pk',
      expressionValues: {
        ':pk': { S: `event#${eventId}` },
      },
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  const items = ctx.result.items || [];

  // Filter out the event item itself (where SK = event#<id>)
  // Only include EventPlayer items (where Type = 'EventPlayer')
  const players = items.filter((item) => item.Type === 'EventPlayer');

  return players.map((item) => ({
    id: item.guestId || item.userId || '',
    name: item.name || '',
    email: item.email || '',
    role: item.role || '',
    status: item.status || '',
    team: item.team || null,
    joinedAt: item.joinedAt || '',
  }));
}

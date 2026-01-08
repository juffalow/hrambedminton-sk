import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { eventId, userId, guestId } = ctx.args;

  if (!userId && !guestId) {
    util.error('Either userId or guestId must be provided', 'ValidationError');
  }

  const sk = userId ? `user#${userId}` : `guest#${guestId}`;

  return {
    operation: 'DeleteItem',
    key: util.dynamodb.toMapValues({
      PK: `event#${eventId}`,
      SK: sk,
    }),
    condition: {
      expression: 'attribute_exists(PK)',
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    if (ctx.error.type === 'DynamoDB:ConditionalCheckFailedException') {
      util.error('Player not found in this event', 'PlayerNotFound');
    }
    util.error(ctx.error.message, ctx.error.type);
  }

  const item = ctx.result;
  if (!item) {
    return null;
  }

  return {
    userId: item.userId || null,
    userName: item.userName || null,
    guestId: item.guestId || null,
    guestName: item.name || null,
    guestEmail: item.email || null,
    team: item.team,
    role: item.role,
    status: item.status,
    joinedAt: item.joinedAt,
  };
}

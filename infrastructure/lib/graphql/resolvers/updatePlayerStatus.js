import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { input } = ctx.args;
  const { eventId, userId, guestId, status } = input;

  if (!userId && !guestId) {
    util.error('Either userId or guestId must be provided', 'ValidationError');
  }

  const sk = userId ? `user#${userId}` : `guest#${guestId}`;

  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({
      PK: `event#${eventId}`,
      SK: sk,
    }),
    update: {
      expression: 'SET #status = :status',
      expressionNames: {
        '#status': 'status',
      },
      expressionValues: util.dynamodb.toMapValues({
        ':status': status,
      }),
    },
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
  return {
    userId: item.userId || null,
    userName: item.userName || null,
    guestId: item.guestId || null,
    guestName: item.guestName || null,
    guestEmail: item.guestEmail || null,
    team: item.team,
    role: item.role,
    status: item.status,
    joinedAt: item.joinedAt,
  };
}

import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { input } = ctx.args;
  const { eventId, userId, userName, guestName, guestEmail, team } = input;
  const now = util.time.nowISO8601();

  // Determine if this is a registered user or guest
  const isGuest = !userId && guestName && guestEmail;
  const isUser = !!userId;

  if (!isGuest && !isUser) {
    util.error(
      'Either userId or both guestName and guestEmail must be provided',
      'ValidationError'
    );
  }

  let key;
  let attributes;

  if (isUser) {
    key = {
      PK: `event#${eventId}`,
      SK: `user#${userId}`,
    };
    attributes = {
      Type: 'EventPlayer',
      GSI1PK: `user#${userId}`,
      GSI1SK: `event#${eventId}`,
      userId: userId,
      userName: userName || null,
      team: team || null,
      role: 'attendee',
      status: 'confirmed',
      joinedAt: now,
    };
  } else {
    const guestId = util.autoId();
    key = {
      PK: `event#${eventId}`,
      SK: `guest#${guestId}`,
    };
    attributes = {
      Type: 'EventPlayer',
      GSI1PK: `email#${guestEmail}`,
      GSI1SK: `event#${eventId}`,
      guestId: guestId,
      name: guestName,
      email: guestEmail,
      team: team || null,
      role: 'attendee',
      status: 'confirmed',
      joinedAt: now,
    };
  }

  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues(key),
    attributeValues: util.dynamodb.toMapValues(attributes),
    condition: {
      expression: 'attribute_not_exists(PK)',
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    if (ctx.error.type === 'DynamoDB:ConditionalCheckFailedException') {
      util.error('Player already added to this event', 'PlayerAlreadyExists');
    }
    util.error(ctx.error.message, ctx.error.type);
  }

  const item = ctx.result;
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

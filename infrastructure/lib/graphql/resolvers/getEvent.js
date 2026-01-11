import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { id } = ctx.args;

  // Decode the base64 ID to get the actual event ID
  const decoded = util.base64Decode(id);

  // Expected format: "event-{uuid}"
  if (!decoded || !decoded.startsWith('event-')) {
    util.error('Invalid event ID format', 'ValidationError');
  }

  const eventId = decoded.substring(6); // Remove "event-" prefix

  return {
    operation: 'GetItem',
    key: {
      PK: { S: `event#${eventId}` },
      SK: { S: `event#${eventId}` },
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  const item = ctx.result;

  if (!item) {
    util.error('Event not found', 'NotFoundError');
  }

  if (item.Type !== 'Event') {
    util.error('Event not found', 'NotFoundError');
  }

  // Generate base64 encoded id
  const base64Id = util.base64Encode(`event-${item.id}`);

  return {
    id: base64Id,
    _id: item.id,
    eventType: item.eventType,
    name: item.name,
    description: item.description || '',
    date: item.date,
    time: item.time,
    maxPlayers: item.maxPlayers,
    place: item.place,
    court: item.court,
    ownerId: item.ownerId,
    createdAt: item.createdAt,
  };
}

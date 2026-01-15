import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { input } = ctx.args;

  // Decode the event ID
  const decoded = util.base64Decode(input.eventId);

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

  // Return the raw event item for use in next pipeline function
  return item;
}

import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { input } = ctx.args;
  const now = util.time.nowISO8601();
  const guestId = util.autoId();

  // Decode the event ID
  const decoded = util.base64Decode(input.eventId);

  if (!decoded || !decoded.startsWith('event-')) {
    util.error('Invalid event ID format', 'ValidationError');
  }

  const eventId = decoded.substring(6); // Remove "event-" prefix

  // Validate input lengths
  if (input.guestName.length < 1 || input.guestName.length > 64) {
    util.error('guestName must be between 1 and 64 characters', 'ValidationError');
  }

  if (input.team && (input.team.length < 1 || input.team.length > 32)) {
    util.error('team must be between 1 and 32 characters', 'ValidationError');
  }

  // Get event data from previous function in pipeline
  const event = ctx.prev.result;

  if (!event) {
    util.error('Event not found', 'NotFoundError');
  }

  if (event.Type !== 'Event') {
    util.error('Event not found', 'NotFoundError');
  }

  // Check if event date/time has passed
  const eventDateTime = util.time.parseISO8601ToEpochMilliSeconds(`${event.date}T${event.time}:00.000Z`);
  const nowMillis = util.time.nowEpochMilliSeconds();
  if (eventDateTime <= nowMillis) {
    util.error('Cannot join event that has already started or passed', 'ValidationError');
  }

  // Build attribute values
  const attributeValues = {
    GSI1PK: { S: `email#${input.guestEmail}` },
    GSI1SK: { S: `event#${event.date}#${eventId}` },
    Type: { S: 'EventPlayer' },
    guestId: { S: guestId },
    name: { S: input.guestName },
    email: { S: input.guestEmail },
    role: { S: 'player' },
    status: { S: 'confirmed' },
    joinedAt: { S: now },
  };

  // Add team if provided
  if (input.team) {
    attributeValues.team = { S: input.team };
  }

  // Store data in stash for response function
  ctx.stash.guestId = guestId;
  ctx.stash.eventId = eventId;
  ctx.stash.eventDate = event.date;

  return {
    operation: 'PutItem',
    key: {
      PK: { S: `event#${eventId}` },
      SK: { S: `guest#${guestId}` },
    },
    attributeValues,
    condition: {
      expression: 'attribute_not_exists(PK)',
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  return {
    guestId: ctx.stash.guestId,
    success: true,
  };
}

import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { input } = ctx.args;
  const now = util.time.nowISO8601();
  const eventId = util.autoId();
  const guestId = util.autoId();

  // Validate input
  if (!input.guestEmail || !input.guestName) {
    util.error('Guest email and name are required', 'ValidationError');
  }

  if (input.guestName.length > 64) {
    util.error('guestName must be 64 characters or less', 'ValidationError');
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.guestEmail)) {
    util.error('guestEmail must be a valid email address', 'ValidationError');
  }

  if (input.maxPlayers < 2 || input.maxPlayers > 32) {
    util.error('maxPlayers must be between 2 and 32', 'ValidationError');
  }

  if (input.name.length > 100) {
    util.error('name must be 100 characters or less', 'ValidationError');
  }

  if (input.description && input.description.length > 255) {
    util.error('description must be 255 characters or less', 'ValidationError');
  }

  if (input.place.length > 128) {
    util.error('place must be 128 characters or less', 'ValidationError');
  }

  if (input.court.length > 64) {
    util.error('court must be 64 characters or less', 'ValidationError');
  }

  // Validate date format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    util.error('date must be in YYYY-MM-DD format', 'ValidationError');
  }

  // Validate time format (HH:mm)
  if (!/^\d{2}:\d{2}$/.test(input.time)) {
    util.error('time must be in HH:mm format', 'ValidationError');
  }

  const transactItems = [
    // Event item
    {
      table: ctx.stash.tableName,
      operation: 'PutItem',
      key: {
        PK: { S: `event#${eventId}` },
        SK: { S: `event#${eventId}` },
      },
      attributeValues: {
        PK: { S: `event#${eventId}` },
        SK: { S: `event#${eventId}` },
        GSI1PK: { S: `owner#${guestId}` },
        GSI1SK: { S: `date#${input.date}#time#${input.time}` },
        Type: { S: 'Event' },
        id: { S: eventId },
        eventType: { S: input.eventType },
        name: { S: input.name },
        description: { S: input.description || '' },
        date: { S: input.date },
        time: { S: input.time },
        maxPlayers: { N: input.maxPlayers.toString() },
        place: { S: input.place },
        court: { S: input.court },
        ownerId: { S: guestId },
        createdAt: { S: now },
      },
      condition: {
        expression: 'attribute_not_exists(PK)',
      },
    },
    // EventPlayer item (guest as owner)
    {
      table: ctx.stash.tableName,
      operation: 'PutItem',
      key: {
        PK: { S: `event#${eventId}` },
        SK: { S: `guest#${guestId}` },
      },
      attributeValues: {
        PK: { S: `event#${eventId}` },
        SK: { S: `guest#${guestId}` },
        GSI1PK: { S: `email#${input.guestEmail}` },
        GSI1SK: { S: `event#${input.date}#${eventId}` },
        Type: { S: 'EventPlayer' },
        guestId: { S: guestId },
        name: { S: input.guestName },
        email: { S: input.guestEmail },
        role: { S: 'owner' },
        status: { S: 'confirmed' },
        joinedAt: { S: now },
      },
      condition: {
        expression: 'attribute_not_exists(PK)',
      },
    },
  ];

  // Store event data in stash for response function
  ctx.stash.eventData = {
    eventId,
    guestId,
    input,
    now,
  };

  return {
    operation: 'TransactWriteItems',
    transactItems,
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  const { eventId, guestId, input, now } = ctx.stash.eventData;

  // Generate base64 encoded id
  const base64Id = util.base64Encode(`event-${eventId}`);

  return {
    id: base64Id,
    _id: eventId,
    eventType: input.eventType,
    name: input.name,
    description: input.description || '',
    date: input.date,
    time: input.time,
    maxPlayers: input.maxPlayers,
    place: input.place,
    court: input.court,
    ownerId: guestId,
    createdAt: now,
  };
}

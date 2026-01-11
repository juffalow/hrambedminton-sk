import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { input } = ctx.args;
  const now = util.time.nowISO8601();
  const eventId = util.autoId();
  const guestId = util.autoId();

  // Validate input lengths
  // Note: AWSEmail, AWSDate, AWSTime types handle format validation automatically

  if (input.guestName.length < 1 || input.guestName.length > 64) {
    util.error('guestName must be between 1 and 64 characters', 'ValidationError');
  }

  if (input.name.length < 1 || input.name.length > 100) {
    util.error('name must be between 1 and 100 characters', 'ValidationError');
  }

  if (input.description && input.description.length > 255) {
    util.error('description must be 255 characters or less', 'ValidationError');
  }

  if (input.place.length < 1 || input.place.length > 128) {
    util.error('place must be between 1 and 128 characters', 'ValidationError');
  }

  if (input.court.length < 1 || input.court.length > 64) {
    util.error('court must be between 1 and 64 characters', 'ValidationError');
  }

  if (input.maxPlayers < 2 || input.maxPlayers > 32) {
    util.error('maxPlayers must be between 2 and 32', 'ValidationError');
  }

  // Validate date and time are in the future
  const eventDateTime = util.time.parseISO8601ToEpochMilliSeconds(`${input.date}T${input.time}:00.000Z`);
  const nowMillis = util.time.nowEpochMilliSeconds();
  if (eventDateTime <= nowMillis) {
    util.error('Event date and time must be in the future', 'ValidationError');
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
        GSI1PK: { S: `owner#${guestId}` },
        GSI1SK: { S: `date#${input.date}#time#${input.time}` },
        Type: { S: 'Event' },
        id: { S: eventId },
        eventType: { S: input.eventType },
        name: { S: input.name },
        description: { S: input.description || '' },
        date: { S: input.date },
        time: { S: input.time },
        maxPlayers: { N: input.maxPlayers },
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

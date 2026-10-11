import { util } from '@aws-appsync/utils';

// Used when the client does not send the venue time zone
const DEFAULT_TIME_ZONE = 'Europe/Bratislava';

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

  // Date and time are wall-clock time at the venue, so an offset would be ambiguous.
  // AWSDate and AWSTime accept one, so reject it here.
  if (!util.matches('^\\d{4}-\\d{2}-\\d{2}$', input.date)) {
    util.error('date must be in YYYY-MM-DD format without a timezone', 'ValidationError');
  }

  if (!util.matches('^\\d{2}:\\d{2}(:\\d{2})?$', input.time)) {
    util.error('time must be in HH:mm or HH:mm:ss format without a timezone', 'ValidationError');
  }

  const timeZone = input.timeZone || DEFAULT_TIME_ZONE;

  // IANA time zone name, e.g. Europe/Bratislava, America/New_York or UTC
  if (timeZone.length > 64 || !util.matches('^[A-Za-z_]+(/[A-Za-z0-9_+\\-]+)*$', timeZone)) {
    util.error('timeZone must be an IANA time zone name, e.g. Europe/Bratislava', 'ValidationError');
  }

  const time = input.time.length === 5 ? `${input.time}:00` : input.time;
  const startsAtMillis = util.time.parseFormattedToEpochMilliSeconds(
    `${input.date} ${time}`,
    'yyyy-MM-dd HH:mm:ss',
    timeZone
  );
  const startsAt = util.time.epochMilliSecondsToISO8601(startsAtMillis);

  // Validate date and time are in the future
  if (startsAtMillis <= util.time.nowEpochMilliSeconds()) {
    util.error('Event date and time must be in the future', 'ValidationError');
  }

  const transactItems = [
    // Event item
    {
      table: ctx.env.TABLE_NAME,
      operation: 'PutItem',
      key: {
        PK: { S: `event#${eventId}` },
        SK: { S: `event#${eventId}` },
      },
      attributeValues: {
        GSI1PK: { S: 'type#event' },
        // Event ID makes the key unique, so it can be used as a pagination cursor
        GSI1SK: { S: `startsAt#${startsAt}#${eventId}` },
        GSI2PK: { S: `owner#${guestId}` },
        GSI2SK: { S: `startsAt#${startsAt}` },
        Type: { S: 'Event' },
        id: { S: eventId },
        eventType: { S: input.eventType },
        name: { S: input.name },
        description: { S: input.description || '' },
        date: { S: input.date },
        time: { S: time },
        timeZone: { S: timeZone },
        startsAt: { S: startsAt },
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
      table: ctx.env.TABLE_NAME,
      operation: 'PutItem',
      key: {
        PK: { S: `event#${eventId}` },
        SK: { S: `guest#${guestId}` },
      },
      attributeValues: {
        GSI1PK: { S: 'type#eventPlayer' },
        GSI1SK: { S: `joinedAt#${now}` },
        GSI2PK: { S: `email#${input.guestEmail}` },
        GSI2SK: { S: `event#${startsAt}#${eventId}` },
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
    time,
    timeZone,
    startsAt,
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

  const { eventId, guestId, input, time, timeZone, startsAt, now } = ctx.stash.eventData;

  // Generate base64 encoded id
  const base64Id = util.base64Encode(`event-${eventId}`);

  return {
    id: base64Id,
    _id: eventId,
    eventType: input.eventType,
    name: input.name,
    description: input.description || '',
    date: input.date,
    time,
    timeZone,
    startsAt,
    maxPlayers: input.maxPlayers,
    place: input.place,
    court: input.court,
    ownerId: guestId,
    createdAt: now,
  };
}

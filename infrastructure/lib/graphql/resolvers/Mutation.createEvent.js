import { util } from '@aws-appsync/utils';

// Used when the client does not send the venue time zone
const DEFAULT_TIME_ZONE = 'Europe/Bratislava';

/**
 * Pipeline resolver: validates the input here, then runs getCurrentUser and createEvent.
 * Only signed-in users (Cognito user pool) can call it.
 */
export function request(ctx) {
  const { input } = ctx.args;

  // Note: AWSDate, AWSTime types handle format validation automatically

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

  // Validate date and time are in the future
  if (startsAtMillis <= util.time.nowEpochMilliSeconds()) {
    util.error('Event date and time must be in the future', 'ValidationError');
  }

  ctx.stash.event = {
    id: util.autoId(),
    eventType: input.eventType,
    name: input.name,
    description: input.description || '',
    date: input.date,
    time,
    timeZone,
    startsAt: util.time.epochMilliSecondsToISO8601(startsAtMillis),
    maxPlayers: input.maxPlayers,
    place: input.place,
    court: input.court,
    createdAt: util.time.nowISO8601(),
  };

  return {};
}

export function response(ctx) {
  return ctx.prev.result;
}

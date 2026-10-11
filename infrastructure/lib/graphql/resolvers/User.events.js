import { util, runtime } from '@aws-appsync/utils';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;
// Sorts after any "<relation>#event#<startsAt>#<eventId>" sort key with the same prefix
const KEY_END = '#~';
// GSI2SK prefix of the user's EventPlayer items for each filter
const PREFIXES = {
  OWNED: 'owner#event#',
  JOINED: 'joined#event#',
};

/**
 * AWSDateTime accepts any offset (e.g. +02:00), but GSI2SK holds UTC ISO 8601 strings,
 * so normalize to UTC before comparing them as strings.
 */
function toUtcISO8601(value) {
  return util.time.epochMilliSecondsToISO8601(util.time.parseISO8601ToEpochMilliSeconds(value));
}

/**
 * A cursor is the base64 encoded GSI2SK of the user's EventPlayer item, which is unique:
 * <relation>#event#<startsAt>#<eventId>. It is only valid for the filter it was returned for.
 */
function decodeCursor(cursor, prefix) {
  const key = util.base64Decode(cursor);

  if (!key || !util.matches('^(owner|joined)#event#[^#]+#[0-9a-fA-F-]+$', key) || !key.startsWith(prefix)) {
    util.error('after is not a valid cursor for this filter', 'ValidationError');
  }

  return key;
}

/**
 * Pipeline resolver for User.events: events the user owns or joined, sorted by start time, earliest first.
 * Validates the arguments here, then queryUserEventPlayers reads the user's EventPlayer items from GSI2
 * and batchGetEvents loads their events.
 */
export function request(ctx) {
  const { filter, from, to, first, after } = ctx.args;
  const prefix = PREFIXES[filter];

  if (!prefix) {
    util.error('filter must be OWNED or JOINED', 'ValidationError');
  }

  const pageSize = first !== undefined && first !== null ? first : DEFAULT_PAGE_SIZE;

  if (pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
    util.error(`first must be between 1 and ${MAX_PAGE_SIZE}`, 'ValidationError');
  }

  // Upcoming events by default
  const fromMillis = from ? util.time.parseISO8601ToEpochMilliSeconds(from) : util.time.nowEpochMilliSeconds();

  if (to && util.time.parseISO8601ToEpochMilliSeconds(to) < fromMillis) {
    util.error('to must not be before from', 'ValidationError');
  }

  // A key condition allows a single sort key condition, so from/to and the cursor are merged
  // into one inclusive BETWEEN range. The cursor item itself is dropped by queryUserEventPlayers.
  let lower = `${prefix}${util.time.epochMilliSecondsToISO8601(fromMillis)}`;
  const upper = to ? `${prefix}${toUtcISO8601(to)}${KEY_END}` : `${prefix}~`;
  const cursorKey = after ? decodeCursor(after, prefix) : null;

  if (cursorKey && cursorKey > lower) {
    lower = cursorKey;
  }

  if (lower > upper) {
    runtime.earlyReturn({
      edges: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
    });
  }

  ctx.stash.userEvents = { userId: ctx.source.id, lower, upper, pageSize, cursorKey };

  return {};
}

export function response(ctx) {
  const { players, hasNextPage } = ctx.stash.userEvents;
  const events = ctx.prev.result || [];
  const eventsById = {};

  events.forEach((event) => {
    if (event) {
      eventsById[event.id] = event;
    }
  });

  // Keep the order of the EventPlayer items (by start time) and skip events that no longer exist
  const edges = players
    .filter((player) => eventsById[player.PK.substring('event#'.length)])
    .map((player) => {
      const item = eventsById[player.PK.substring('event#'.length)];

      return {
        cursor: util.base64Encode(player.GSI2SK),
        node: {
          id: util.base64Encode(`event-${item.id}`),
          _id: item.id,
          eventType: item.eventType,
          name: item.name,
          description: item.description || '',
          date: item.date,
          time: item.time,
          timeZone: item.timeZone,
          startsAt: item.startsAt,
          maxPlayers: item.maxPlayers,
          place: item.place,
          court: item.court,
          ownerId: item.ownerId,
          createdAt: item.createdAt,
        },
      };
    });

  return {
    edges,
    pageInfo: {
      hasNextPage,
      // Only forward pagination (first/after) is supported
      hasPreviousPage: false,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    },
  };
}

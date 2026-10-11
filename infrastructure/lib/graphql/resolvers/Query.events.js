import { util, runtime } from '@aws-appsync/utils';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;
// Sorts after any "startsAt#<startsAt>#<eventId>" sort key with the same prefix
const KEY_END = '#~';

/**
 * AWSDateTime accepts any offset (e.g. +02:00), but GSI1SK holds UTC ISO 8601 strings,
 * so normalize to UTC before comparing them as strings.
 */
function toUtcISO8601(value) {
  return util.time.epochMilliSecondsToISO8601(util.time.parseISO8601ToEpochMilliSeconds(value));
}

/**
 * A cursor is the base64 encoded GSI1SK of the event, which is unique: startsAt#<startsAt>#<eventId>
 */
function decodeCursor(cursor, name) {
  const key = util.base64Decode(cursor);

  if (!key || !util.matches('^startsAt#[^#]+#[0-9a-fA-F-]+$', key)) {
    util.error(`${name} is not a valid cursor`, 'ValidationError');
  }

  return key;
}

function emptyConnection() {
  return {
    edges: [],
    pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
  };
}

export function request(ctx) {
  const { from, to, first, after } = ctx.args;
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
  // into one inclusive BETWEEN range. The cursor item itself is dropped in the response.
  let lower = `startsAt#${util.time.epochMilliSecondsToISO8601(fromMillis)}`;
  const upper = to ? `startsAt#${toUtcISO8601(to)}${KEY_END}` : `startsAt${KEY_END}`;
  const cursorKey = after ? decodeCursor(after, 'after') : null;

  if (cursorKey && cursorKey > lower) {
    lower = cursorKey;
  }

  if (lower > upper) {
    runtime.earlyReturn(emptyConnection());
  }

  ctx.stash.pagination = { pageSize, cursorKey };

  return {
    operation: 'Query',
    index: 'GSI1',
    query: {
      expression: 'GSI1PK = :pk AND GSI1SK BETWEEN :lower AND :upper',
      expressionValues: util.dynamodb.toMapValues({
        ':pk': 'type#event',
        ':lower': lower,
        ':upper': upper,
      }),
    },
    scanIndexForward: true,
    // One extra item tells if there is another page, one more for the cursor item itself
    limit: pageSize + (cursorKey ? 2 : 1),
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  const { pageSize, cursorKey } = ctx.stash.pagination;
  let items = ctx.result.items || [];

  if (cursorKey && items.length > 0 && items[0].GSI1SK === cursorKey) {
    items = items.slice(1);
  }

  // nextToken without the extra item means DynamoDB stopped at its 1 MB page limit, so more may exist
  const hasMore = items.length > pageSize || !!ctx.result.nextToken;
  items = items.slice(0, pageSize);

  const edges = items.map((item) => ({
    cursor: util.base64Encode(item.GSI1SK),
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
  }));

  return {
    edges,
    pageInfo: {
      hasNextPage: hasMore,
      // Only forward pagination (first/after) is supported
      hasPreviousPage: false,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    },
  };
}

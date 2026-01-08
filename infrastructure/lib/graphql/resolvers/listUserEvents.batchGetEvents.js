import { util } from '@aws-appsync/utils';

// Function 2: BatchGetItem to fetch Event records
export function request(ctx) {
  const { eventIds } = ctx.prev.result;

  if (!eventIds || eventIds.length === 0) {
    return { operation: 'BatchGetItem', tables: {} };
  }

  const keys = eventIds.map((eventId) =>
    util.dynamodb.toMapValues({
      PK: `event#${eventId}`,
      SK: `event#${eventId}`,
    })
  );

  return {
    operation: 'BatchGetItem',
    tables: {
      HramBedmintonTable: {
        keys,
        consistentRead: false,
      },
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  const { eventIds, playerItems, hasNextPage, hasPreviousPage, lastItem } =
    ctx.prev.result;

  // Handle empty result
  if (!eventIds || eventIds.length === 0) {
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage,
        startCursor: null,
        endCursor: null,
      },
      totalCount: null,
    };
  }

  // Get events from batch result
  const events = ctx.result.data?.HramBedmintonTable || [];

  // Create a map for quick lookup
  const eventMap = {};
  events.forEach((event) => {
    eventMap[event.id] = event;
  });

  // Build edges in the same order as eventIds
  const edges = playerItems.map((playerItem) => {
    const eventId = playerItem.PK.replace('event#', '');
    const event = eventMap[eventId] || {};

    return {
      node: {
        id: eventId,
        eventType: event.eventType || null,
        name: event.name || null,
        description: event.description || null,
        date: event.date || null,
        time: event.time || null,
        maxPlayers: event.maxPlayers || null,
        place: event.place || null,
        court: event.court || null,
        ownerId: event.ownerId || null,
        createdAt: event.createdAt || null,
      },
      cursor: util.base64Encode(
        JSON.stringify({
          PK: playerItem.PK,
          SK: playerItem.SK,
          GSI1PK: playerItem.GSI1PK,
          GSI1SK: playerItem.GSI1SK,
        })
      ),
    };
  });

  const endCursor = lastItem
    ? util.base64Encode(
        JSON.stringify({
          PK: lastItem.PK,
          SK: lastItem.SK,
          GSI1PK: lastItem.GSI1PK,
          GSI1SK: lastItem.GSI1SK,
        })
      )
    : null;

  return {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor,
    },
    totalCount: null,
  };
}

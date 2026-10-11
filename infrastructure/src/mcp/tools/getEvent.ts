import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { graphql, GraphQLConfig, GraphQLRequestError, toToolError } from '../graphql';

const EVENT_QUERY = `
  query Event($id: ID!) {
    event(id: $id) {
      _id
      name
      description
      eventType
      date
      time
      timeZone
      startsAt
      place
      court
      maxPlayers
      players {
        name
        role
        status
        team
        joinedAt
      }
    }
  }
`;

interface EventQueryResult {
  event: {
    _id: string;
    name: string;
    description: string | null;
    eventType: string;
    date: string;
    time: string;
    timeZone: string;
    startsAt: string;
    place: string;
    court: string;
    maxPlayers: number;
    players: { name: string; role: string; status: string; team: string | null; joinedAt: string }[];
  };
}

/**
 * Accepts both the public ID used in the webapp URL (base64 of "event-<uuid>") and the raw event UUID,
 * and returns the public ID the GraphQL API expects.
 */
function toPublicId(id: string): string {
  const decoded = Buffer.from(id, 'base64').toString('utf8');

  return decoded.startsWith('event-') ? id : Buffer.from(`event-${id}`, 'utf8').toString('base64');
}

export function registerGetEventTool(server: McpServer, config: GraphQLConfig): void {
  server.registerTool(
    'get_event',
    {
      title: 'Get event details',
      description:
        'Get details of a badminton event: name, type (singles/doubles), date and time (local at the venue), ' +
        'venue time zone, start as UTC (startsAt), place, court, ' +
        'player limit and the list of players who joined. Accepts the event ID from the event URL.',
      inputSchema: {
        eventId: z.string().min(1).describe('Event ID, as shown in the event URL'),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({ eventId }) => {
      let result: EventQueryResult;

      try {
        result = await graphql<EventQueryResult>(config, EVENT_QUERY, { id: toPublicId(eventId) });
      } catch (error) {
        if (error instanceof GraphQLRequestError && error.errorType === 'NotFoundError') {
          return toToolError(new Error(`Event ${eventId} was not found.`));
        }

        return toToolError(error);
      }

      const { event } = result;
      const details = {
        id: event._id,
        name: event.name,
        description: event.description || null,
        eventType: event.eventType,
        date: event.date,
        time: event.time,
        timeZone: event.timeZone,
        startsAt: event.startsAt,
        place: event.place,
        court: event.court,
        maxPlayers: event.maxPlayers,
        playerCount: event.players.length,
        players: event.players,
      };

      return {
        content: [{ type: 'text', text: JSON.stringify(details, null, 2) }],
      };
    },
  );
}

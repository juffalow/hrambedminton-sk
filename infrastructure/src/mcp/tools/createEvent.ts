import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { graphql, GraphQLConfig, toToolError } from '../graphql';

const CREATE_EVENT_MUTATION = `
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      _id
      name
      eventType
      date
      time
      timeZone
      startsAt
      place
      court
      maxPlayers
    }
  }
`;

interface CreateEventResult {
  createEvent: {
    id: string;
    _id: string;
    name: string;
    eventType: string;
    date: string;
    time: string;
    timeZone: string;
    startsAt: string;
    place: string;
    court: string;
    maxPlayers: number;
  };
}

export function registerCreateEventTool(server: McpServer, config: GraphQLConfig): void {
  server.registerTool(
    'create_event',
    {
      title: 'Create event',
      description:
        'Create a new badminton event (singles or doubles) owned by the signed-in user, who joins it as the first ' +
        'confirmed player. Date and time are the local wall-clock time at the venue, in the venue time zone, and ' +
        'must be in the future. Returns the event ID and the path of the event page in the webapp.',
      inputSchema: {
        eventType: z.enum(['SINGLES', 'DOUBLES']).describe('SINGLES (1v1) or DOUBLES (2v2)'),
        name: z.string().min(1).max(100).describe('Event name'),
        description: z.string().max(255).optional().describe('Optional event description'),
        date: z.iso.date().describe('Event date at the venue, YYYY-MM-DD'),
        time: z
          .string()
          .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be in HH:mm format')
          .describe('Event start time at the venue, HH:mm (24-hour), without a timezone offset'),
        timeZone: z
          .string()
          .optional()
          .describe('IANA time zone of the venue, e.g. Europe/Bratislava. Defaults to Europe/Bratislava'),
        place: z.string().min(1).max(128).describe('Venue / place name'),
        court: z.string().min(1).max(64).describe('Court name or number'),
        maxPlayers: z.number().int().min(2).max(32).describe('Maximum number of players (2-32)'),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
      },
    },
    async (input) => {
      try {
        const { createEvent: event } = await graphql<CreateEventResult>(config, CREATE_EVENT_MUTATION, { input });
        const details = {
          id: event._id,
          publicId: event.id,
          path: `/sk/zapas/${event.id}`,
          name: event.name,
          eventType: event.eventType,
          date: event.date,
          time: event.time,
          timeZone: event.timeZone,
          startsAt: event.startsAt,
          place: event.place,
          court: event.court,
          maxPlayers: event.maxPlayers,
        };

        return {
          content: [{ type: 'text', text: JSON.stringify(details, null, 2) }],
        };
      } catch (error) {
        return toToolError(error);
      }
    },
  );
}

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { graphql, GraphQLConfig, toToolError } from '../graphql';
import { EVENT_SUMMARY_FIELDS, EventConnectionResult, toEventConnection } from './eventSummary';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

const EVENTS_QUERY = `
  query Events($from: AWSDateTime, $to: AWSDateTime, $first: Int, $after: String) {
    events(from: $from, to: $to, first: $first, after: $after) {
      edges {
        cursor
        node {
          ${EVENT_SUMMARY_FIELDS}
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export function registerListEventsTool(server: McpServer, config: GraphQLConfig): void {
  server.registerTool(
    'list_events',
    {
      title: 'List events',
      description:
        'List badminton events sorted by start time, earliest first. Without "from", only upcoming events ' +
        'are listed. Each event has its date and time (local at the venue), time zone, start in UTC, place, court, ' +
        'player limit and number of joined players. Results are paginated: if hasNextPage is true, call again ' +
        'with "after" set to endCursor. Use get_event for the list of players.',
      inputSchema: {
        from: z.iso
          .datetime({ offset: true })
          .optional()
          .describe('List events starting at or after this moment (ISO 8601, e.g. 2026-10-12T00:00:00+02:00). Defaults to now'),
        to: z.iso
          .datetime({ offset: true })
          .optional()
          .describe('List events starting at or before this moment (ISO 8601)'),
        first: z
          .number()
          .int()
          .min(1)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE)
          .describe(`Number of events to return (1-${MAX_PAGE_SIZE})`),
        after: z.string().optional().describe('endCursor from the previous page'),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({ from, to, first, after }) => {
      let result: { events: EventConnectionResult };

      try {
        result = await graphql<{ events: EventConnectionResult }>(config, EVENTS_QUERY, { from, to, first, after });
      } catch (error) {
        return toToolError(error);
      }

      const connection = toEventConnection(result.events);

      return {
        content: [{ type: 'text', text: JSON.stringify(connection, null, 2) }],
      };
    },
  );
}

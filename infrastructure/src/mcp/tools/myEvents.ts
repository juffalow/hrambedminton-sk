import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { graphql, GraphQLConfig, toToolError } from '../graphql';
import { EVENT_SUMMARY_FIELDS, EventConnectionResult, toEventConnection } from './eventSummary';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

const MY_EVENTS_QUERY = `
  query MyEvents($filter: UserEventsFilter!, $from: AWSDateTime, $to: AWSDateTime, $first: Int, $after: String) {
    me {
      events(filter: $filter, from: $from, to: $to, first: $first, after: $after) {
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
  }
`;

export function registerMyEventsTool(server: McpServer, config: GraphQLConfig): void {
  server.registerTool(
    'my_events',
    {
      title: 'My events',
      description:
        'List events of the signed-in user, sorted by start time, earliest first: either the events they created ' +
        '(OWNED) or the events they joined as a player (JOINED). Call it once per filter to get both. Without ' +
        '"from", only upcoming events are listed. Each event has the same fields as in list_events. Results are ' +
        'paginated: if hasNextPage is true, call again with the same filter and "after" set to endCursor.',
      inputSchema: {
        filter: z.enum(['OWNED', 'JOINED']).describe('OWNED: events the user created, JOINED: events the user joined'),
        from: z.iso
          .datetime({ offset: true })
          .optional()
          .describe(
            'List events starting at or after this moment (ISO 8601, e.g. 2026-10-12T00:00:00+02:00). Defaults to now'
          ),
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
        after: z.string().optional().describe('endCursor from the previous page of the same filter'),
      },
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({ filter, from, to, first, after }) => {
      try {
        const result = await graphql<{ me: { events: EventConnectionResult } }>(config, MY_EVENTS_QUERY, {
          filter,
          from,
          to,
          first,
          after,
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(toEventConnection(result.me.events), null, 2) }],
        };
      } catch (error) {
        return toToolError(error);
      }
    }
  );
}

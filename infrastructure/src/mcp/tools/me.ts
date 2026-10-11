import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { graphql, GraphQLConfig, toToolError } from '../graphql';

const ME_QUERY = `
  query Me {
    me {
      id
      name
      email
      createdAt
    }
  }
`;

export function registerMeTool(server: McpServer, config: GraphQLConfig): void {
  server.registerTool(
    'me',
    {
      title: 'Signed-in user',
      description: 'Get the signed-in user: ID, name, email and when they registered.',
      inputSchema: {},
      annotations: {
        readOnlyHint: true,
      },
    },
    async () => {
      try {
        const result = await graphql<{ me: unknown }>(config, ME_QUERY, {});

        return {
          content: [{ type: 'text', text: JSON.stringify(result.me, null, 2) }],
        };
      } catch (error) {
        return toToolError(error);
      }
    },
  );
}

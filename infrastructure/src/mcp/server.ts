import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLConfig } from './graphql';
import { registerCreateEventTool } from './tools/createEvent';
import { registerGetEventTool } from './tools/getEvent';
import { registerListEventsTool } from './tools/listEvents';
import { registerMeTool } from './tools/me';
import { registerMyEventsTool } from './tools/myEvents';

export function createServer(config: GraphQLConfig): McpServer {
  const server = new McpServer({
    name: 'hrambedminton',
    version: '0.3.0',
  });

  registerMeTool(server, config);
  registerGetEventTool(server, config);
  registerListEventsTool(server, config);
  registerMyEventsTool(server, config);
  registerCreateEventTool(server, config);

  return server;
}

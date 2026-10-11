import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import {
  AUTHORIZATION_SERVER_METADATA_PATH,
  AuthConfig,
  PROTECTED_RESOURCE_METADATA_PATHS,
  authorizationServerMetadata,
  getBearerToken,
  isValidAccessToken,
  protectedResourceMetadata,
  unauthorized,
} from './auth';
import { createServer } from './server';

const { GRAPHQL_URL, USER_POOL_ID, AUTH_DOMAIN_URL } = process.env;

function toRequest(event: APIGatewayProxyEventV2): Request {
  const query = event.rawQueryString ? `?${event.rawQueryString}` : '';
  const url = `https://${event.requestContext.domainName}${event.rawPath}${query}`;
  const method = event.requestContext.http.method;
  const body = event.body && event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;

  return new Request(url, {
    method,
    headers: event.headers as Record<string, string>,
    body: method === 'GET' || method === 'HEAD' ? undefined : body,
  });
}

function json(body: unknown): APIGatewayProxyStructuredResultV2 {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

async function toResult(response: Response): Promise<APIGatewayProxyStructuredResultV2> {
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: await response.text(),
  };
}

/**
 * Stateless MCP server over Streamable HTTP. Every request gets a fresh server and transport,
 * and responses are plain JSON (no SSE), so it fits API Gateway's request/response model.
 *
 * Every MCP request needs a Cognito access token of a signed-in user (OAuth 2.1, MCP authorization spec).
 * The token is verified here and forwarded to AppSync, so tools act with the user's permissions.
 */
export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
  if (!GRAPHQL_URL || !USER_POOL_ID || !AUTH_DOMAIN_URL) {
    throw new Error('GRAPHQL_URL, USER_POOL_ID and AUTH_DOMAIN_URL environment variables must be set');
  }

  const authConfig: AuthConfig = { userPoolId: USER_POOL_ID, authDomainUrl: AUTH_DOMAIN_URL };
  const origin = `https://${event.requestContext.domainName}`;
  const method = event.requestContext.http.method;

  // OAuth discovery, public
  if (method === 'GET' && PROTECTED_RESOURCE_METADATA_PATHS.includes(event.rawPath)) {
    return json(protectedResourceMetadata(origin));
  }

  if (method === 'GET' && event.rawPath === AUTHORIZATION_SERVER_METADATA_PATH) {
    return json(authorizationServerMetadata(origin, authConfig));
  }

  // Stateless server has no SSE stream to open (GET) and no session to end (DELETE)
  if (method !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: 'Method Not Allowed',
    };
  }

  const token = getBearerToken(event.headers.authorization);

  if (!token) {
    return unauthorized(origin, false);
  }

  if (!(await isValidAccessToken(authConfig, origin, token))) {
    return unauthorized(origin, true);
  }

  const server = createServer({ url: GRAPHQL_URL, token });
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  try {
    await server.connect(transport);
    const response = await transport.handleRequest(toRequest(event));

    return await toResult(response);
  } finally {
    await server.close();
  }
};

import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

export interface AuthConfig {
  userPoolId: string;
  /** Base URL of the Cognito domain with the hosted sign-in page, e.g. https://<prefix>.auth.<region>.amazoncognito.com */
  authDomainUrl: string;
}

/** Scope of the MCP resource server (identifier <origin>/mcp), keep in sync with McpConstruct */
const TOOLS_SCOPE_NAME = 'tools';

/**
 * Scopes MCP clients request. The tools scope makes Cognito bind the token to this server, and it is the scope
 * the Lambda requires: only the MCP app client is allowed to get it.
 */
function getScopes(origin: string): string[] {
  return ['openid', 'email', 'profile', getToolsScope(origin)];
}

function getToolsScope(origin: string): string {
  return `${origin}/mcp/${TOOLS_SCOPE_NAME}`;
}

export const PROTECTED_RESOURCE_METADATA_PATHS = [
  '/.well-known/oauth-protected-resource',
  '/.well-known/oauth-protected-resource/mcp',
];
export const AUTHORIZATION_SERVER_METADATA_PATH = '/.well-known/oauth-authorization-server';

const verifiers = new Map<string, ReturnType<typeof createVerifier>>();

function createVerifier(config: AuthConfig, origin: string) {
  return CognitoJwtVerifier.create({
    userPoolId: config.userPoolId,
    tokenUse: 'access',
    // The client is checked through the tools scope, which only the MCP app client can get. Its client ID can't be
    // passed to the Lambda: the client depends on the resource server, which depends on this API's URL.
    clientId: null,
    scope: getToolsScope(origin),
  });
}

/**
 * Verifies a Cognito access token of the user pool with the MCP tools scope. Verifiers and their JWKS are cached
 * between invocations. Returns false for a missing, expired or foreign token.
 */
export async function isValidAccessToken(config: AuthConfig, origin: string, token: string): Promise<boolean> {
  let verifier = verifiers.get(origin);

  if (!verifier) {
    verifier = createVerifier(config, origin);
    verifiers.set(origin, verifier);
  }

  try {
    await verifier.verify(token);
    return true;
  } catch {
    return false;
  }
}

export function getBearerToken(authorization: string | undefined): string | null {
  const match = authorization ? /^Bearer\s+(.+)$/i.exec(authorization) : null;

  return match ? match[1].trim() : null;
}

/**
 * RFC 9728 Protected Resource Metadata: tells MCP clients where to sign in. The MCP server itself is listed
 * as the authorization server, see authorizationServerMetadata.
 */
export function protectedResourceMetadata(origin: string) {
  return {
    resource: `${origin}/mcp`,
    authorization_servers: [origin],
    scopes_supported: getScopes(origin),
    bearer_methods_supported: ['header'],
  };
}

/**
 * RFC 8414 Authorization Server Metadata pointing to the Cognito hosted sign-in endpoints. Served by the MCP
 * server because Cognito's own discovery document lacks code_challenge_methods_supported (MCP clients refuse to
 * continue without PKCE support) and lists no auth method for public clients. There is no registration_endpoint:
 * Cognito has no dynamic client registration, so MCP clients are configured with the MCP app client ID.
 */
export function authorizationServerMetadata(origin: string, config: AuthConfig) {
  return {
    issuer: origin,
    authorization_endpoint: `${config.authDomainUrl}/oauth2/authorize`,
    token_endpoint: `${config.authDomainUrl}/oauth2/token`,
    revocation_endpoint: `${config.authDomainUrl}/oauth2/revoke`,
    response_types_supported: ['code'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    code_challenge_methods_supported: ['S256'],
    token_endpoint_auth_methods_supported: ['none'],
    scopes_supported: getScopes(origin),
  };
}

/**
 * 401 that makes MCP clients start the OAuth flow (MCP authorization spec, RFC 9728 section 5.1).
 */
export function unauthorized(origin: string, isInvalidToken: boolean): APIGatewayProxyStructuredResultV2 {
  const error = isInvalidToken ? ', error="invalid_token"' : '';
  const scope = getScopes(origin).join(' ');

  return {
    statusCode: 401,
    headers: {
      'WWW-Authenticate': `Bearer resource_metadata="${origin}${PROTECTED_RESOURCE_METADATA_PATHS[1]}", scope="${scope}"${error}`,
    },
    body: 'Unauthorized',
  };
}

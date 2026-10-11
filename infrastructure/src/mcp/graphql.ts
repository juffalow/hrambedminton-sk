export interface GraphQLConfig {
  url: string;
  /** Cognito access token of the signed-in user, forwarded to AppSync (user pool auth) */
  token: string;
}

export class GraphQLRequestError extends Error {
  constructor(
    message: string,
    public readonly errorType?: string
  ) {
    super(message);
    this.name = 'GraphQLRequestError';
  }
}

interface GraphQLResponse<T> {
  data?: T | null;
  errors?: { message: string; errorType?: string }[];
}

/**
 * Calls the AppSync GraphQL API as the signed-in user, so the MCP tools use the same resolvers, validation,
 * data and permissions as the webapp.
 * Throws GraphQLRequestError with AppSync's errorType (e.g. NotFoundError, ValidationError) on errors.
 */
export async function graphql<T>(config: GraphQLConfig, query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await fetch(config.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new GraphQLRequestError(`GraphQL API responded with ${response.status} ${response.statusText}`);
  }

  const body = (await response.json()) as GraphQLResponse<T>;

  if (body.errors && body.errors.length > 0) {
    throw new GraphQLRequestError(body.errors[0].message, body.errors[0].errorType);
  }

  if (!body.data) {
    throw new GraphQLRequestError('GraphQL API returned no data');
  }

  return body.data;
}

/**
 * Turns a GraphQL error into an MCP tool error result, so the AI sees the validation message.
 */
export function toToolError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  return {
    content: [{ type: 'text' as const, text: message }],
    isError: true,
  };
}

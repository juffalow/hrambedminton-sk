/**
 * Pipeline resolver: getCurrentUser loads the signed-in user (Cognito user pool identity).
 */
export function request() {
  return {};
}

export function response(ctx) {
  const user = ctx.prev.result;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
}

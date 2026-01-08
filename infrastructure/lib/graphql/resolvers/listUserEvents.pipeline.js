import { util } from '@aws-appsync/utils';

// Pipeline request - runs before any functions
export function request() {
  return {};
}

// Pipeline response - runs after all functions, returns final result
export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  return ctx.prev.result;
}

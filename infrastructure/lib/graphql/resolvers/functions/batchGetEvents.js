import { util, runtime } from '@aws-appsync/utils';

/**
 * Loads the Event items of the EventPlayer items returned by the previous pipeline function (PK event#<id>).
 */
export function request(ctx) {
  const players = ctx.prev.result || [];

  // BatchGetItem fails without keys
  if (players.length === 0) {
    runtime.earlyReturn([]);
  }

  // Event items have the same PK and SK: event#<id>
  const tables = {};
  tables[ctx.env.TABLE_NAME] = {
    keys: players.map((player) => util.dynamodb.toMapValues({ PK: player.PK, SK: player.PK })),
  };

  return {
    operation: 'BatchGetItem',
    tables,
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  return ctx.result.data[ctx.env.TABLE_NAME] || [];
}

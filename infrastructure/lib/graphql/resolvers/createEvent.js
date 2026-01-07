import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { input } = ctx.args;
  const id = util.autoId();
  const now = util.time.nowISO8601();
  const ownerId = ctx.identity?.sub || 'anonymous';

  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({
      PK: `event#${id}`,
      SK: `event#${id}`,
    }),
    attributeValues: util.dynamodb.toMapValues({
      Type: 'Event',
      id: id,
      GSI1PK: `owner#${ownerId}`,
      GSI1SK: `date#${input.date}#time#${input.time}`,
      eventType: input.eventType,
      name: input.name,
      description: input.description || null,
      date: input.date,
      time: input.time,
      maxPlayers: input.maxPlayers,
      place: input.place,
      court: input.court || null,
      ownerId: ownerId,
      createdAt: now,
    }),
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  return {
    id: ctx.result.id,
    eventType: ctx.result.eventType,
    name: ctx.result.name,
    description: ctx.result.description,
    date: ctx.result.date,
    time: ctx.result.time,
    maxPlayers: ctx.result.maxPlayers,
    place: ctx.result.place,
    court: ctx.result.court,
    ownerId: ctx.result.ownerId,
    createdAt: ctx.result.createdAt,
  };
}

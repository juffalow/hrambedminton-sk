import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { id } = ctx.args;

  return {
    operation: 'DeleteItem',
    key: util.dynamodb.toMapValues({
      PK: `event#${id}`,
      SK: `event#${id}`,
    }),
    condition: {
      expression: 'attribute_exists(PK)',
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    if (ctx.error.type === 'DynamoDB:ConditionalCheckFailedException') {
      util.error('Event not found', 'EventNotFound');
    }
    util.error(ctx.error.message, ctx.error.type);
  }

  const item = ctx.result;
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    eventType: item.eventType,
    name: item.name,
    description: item.description,
    date: item.date,
    time: item.time,
    maxPlayers: item.maxPlayers,
    place: item.place,
    court: item.court,
    ownerId: item.ownerId,
    createdAt: item.createdAt,
  };
}

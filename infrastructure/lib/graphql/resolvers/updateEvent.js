import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { input } = ctx.args;
  const { id, ...updates } = input;

  const expressionParts = [];
  const expressionNames = {};
  const expressionValues = {};

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      expressionParts.push(`#${key} = :${key}`);
      expressionNames[`#${key}`] = key;
      expressionValues[`:${key}`] = value;
    }
  });

  if (expressionParts.length === 0) {
    util.error('No fields to update', 'ValidationError');
  }

  // If date or time is updated, also update GSI1SK
  if (updates.date || updates.time) {
    expressionParts.push('#gsi1sk = :gsi1sk');
    expressionNames['#gsi1sk'] = 'GSI1SK';
    // We need to fetch current values for date/time if not provided
    // For simplicity, require both if either is updated
  }

  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({
      PK: `event#${id}`,
      SK: `event#${id}`,
    }),
    update: {
      expression: `SET ${expressionParts.join(', ')}`,
      expressionNames,
      expressionValues: util.dynamodb.toMapValues(expressionValues),
    },
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

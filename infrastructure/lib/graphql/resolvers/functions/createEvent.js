import { util } from '@aws-appsync/utils';

/**
 * Creates an event owned by the signed-in user, who is added as the first confirmed player.
 * Expects ctx.stash.event from the Mutation.createEvent resolver and ctx.stash.user from getCurrentUser.
 */
export function request(ctx) {
  const { event, user } = ctx.stash;

  return {
    operation: 'TransactWriteItems',
    transactItems: [
      // Event item
      {
        table: ctx.env.TABLE_NAME,
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({
          PK: `event#${event.id}`,
          SK: `event#${event.id}`,
        }),
        attributeValues: util.dynamodb.toMapValues({
          GSI1PK: 'type#event',
          // Event ID makes the key unique, so it can be used as a pagination cursor
          GSI1SK: `startsAt#${event.startsAt}#${event.id}`,
          GSI2PK: `owner#${user.id}`,
          GSI2SK: `startsAt#${event.startsAt}`,
          Type: 'Event',
          id: event.id,
          eventType: event.eventType,
          name: event.name,
          description: event.description,
          date: event.date,
          time: event.time,
          timeZone: event.timeZone,
          startsAt: event.startsAt,
          maxPlayers: event.maxPlayers,
          place: event.place,
          court: event.court,
          ownerId: user.id,
          createdAt: event.createdAt,
        }),
        condition: {
          expression: 'attribute_not_exists(PK)',
        },
      },
      // EventPlayer item (registered user as owner)
      {
        table: ctx.env.TABLE_NAME,
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({
          PK: `event#${event.id}`,
          SK: `user#${user.id}`,
        }),
        attributeValues: util.dynamodb.toMapValues({
          GSI1PK: 'type#eventPlayer',
          GSI1SK: `joinedAt#${event.createdAt}`,
          GSI2PK: `user#${user.id}`,
          // The relation prefix lets User.events query owned and joined events separately
          GSI2SK: `owner#event#${event.startsAt}#${event.id}`,
          Type: 'EventPlayer',
          userId: user.id,
          name: user.name,
          email: user.email,
          role: 'owner',
          status: 'confirmed',
          joinedAt: event.createdAt,
        }),
        condition: {
          expression: 'attribute_not_exists(PK)',
        },
      },
    ],
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  const { event, user } = ctx.stash;

  return {
    ...event,
    id: util.base64Encode(`event-${event.id}`),
    _id: event.id,
    ownerId: user.id,
  };
}

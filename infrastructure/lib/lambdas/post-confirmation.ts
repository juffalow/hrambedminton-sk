import { PostConfirmationTriggerEvent, PostConfirmationTriggerHandler } from 'aws-lambda';
import { ConditionalCheckFailedException, DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

const TABLE_NAME = process.env.TABLE_NAME;

export const handler: PostConfirmationTriggerHandler = async (
  event: PostConfirmationTriggerEvent,
): Promise<PostConfirmationTriggerEvent> => {
  if (!TABLE_NAME) {
    throw new Error('TABLE_NAME environment variable is not set');
  }

  const userId = event.request.userAttributes.sub;
  const email = event.request.userAttributes.email;
  const name = event.request.userAttributes.name || 'Unknown';
  const now = new Date().toISOString();

  try {
    await client.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: { S: `user#${userId}` },
          SK: { S: `user#${userId}` },
          GSI1PK: { S: 'type#user' },
          GSI1SK: { S: `createdAt#${now}` },
          Type: { S: 'User' },
          id: { S: userId },
          email: { S: email },
          name: { S: name },
          createdAt: { S: now },
        },
        ConditionExpression: 'attribute_not_exists(PK)',
      }),
    );

    console.log(`User ${userId} synced to DynamoDB`);
  } catch (error) {
    if (error instanceof ConditionalCheckFailedException) {
      console.log(`User ${userId} already exists in DynamoDB, skipping creation`);
      return event;
    }
    console.error('Error syncing user to DynamoDB:', error);
    throw error;
  }

  return event;
};

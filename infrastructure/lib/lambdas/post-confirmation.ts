import { PostConfirmationTriggerEvent, PostConfirmationTriggerHandler } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

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
  const name = event.request.userAttributes.name;
  const now = new Date().toISOString();

  try {
    await client.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: { S: `user#${userId}` },
          SK: { S: `user#${userId}` },
          Type: { S: 'User' },
          id: { S: userId },
          email: { S: email },
          name: { S: name },
          createdAt: { S: now },
        },
      }),
    );

    console.log(`User ${userId} synced to DynamoDB`);
  } catch (error) {
    console.error('Error syncing user to DynamoDB:', error);
    throw error;
  }

  return event;
};

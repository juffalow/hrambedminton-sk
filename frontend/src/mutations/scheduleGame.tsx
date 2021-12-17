import { commitMutation } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import environment from '../environment';

interface CreateGameParameters {
  title: string;
  place: string;
  court: string;
  playedAt: string;
  type: string;
  invitation: string;
}

async function createGame(input: CreateGameParameters): Promise<any> {
  return new Promise((resolve, reject) => {
    commitMutation<any>(environment, {
      mutation: graphql`
        mutation scheduleGameMutation($input: NewScheduledGame!) {
          scheduleGame(input: $input) {
            id
            _id
            title
          }
        }
      `,
      variables: {input},
      onCompleted: (response: any) => {
        resolve(response.createGame)
      },
      onError: (error) => reject(error),
    });
  });
}

export default createGame;

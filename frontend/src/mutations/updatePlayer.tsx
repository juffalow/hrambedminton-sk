import { commitMutation } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import environment from '../environment';

interface UpdatePlayerParameters {
  id: string;
  firstName?: string;
  lastName?: string;
  isVerified?: boolean;
}

async function updatePlayer(input: UpdatePlayerParameters): Promise<Player> {
  return new Promise((resolve, reject) => {
    commitMutation<any>(environment, {
      mutation: graphql`
        mutation updatePlayerMutation($input: UpdatePlayerInput!) {
          updatePlayer(input: $input) {
            id
            _id
            firstName
            lastName
          }
        }
      `,
      variables: {input},
      onCompleted: (response: any) => {
        resolve(response.updatePlayer)
      },
      onError: (error) => reject(error),
    });
  });
}

export default updatePlayer;

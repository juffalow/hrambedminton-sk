import { commitMutation } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import environment from '../environment';

interface CreatePlayerParameters {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

async function createPlayer(input: CreatePlayerParameters) {
  return new Promise((resolve, reject) => {
    commitMutation<any>(environment, {
      mutation: graphql`
        mutation createPlayerMutation($input: NewPlayer!) {
          createPlayer(input: $input) {
            id
            _id
            firstName
            lastName
          }
        }
      `,
      variables: {input},
      onCompleted: (response: any) => {
        resolve(response.createPlayer)
      },
      onError: (error) => reject(error),
    });
  });
}

export default createPlayer;

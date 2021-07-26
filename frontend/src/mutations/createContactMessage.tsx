import { commitMutation } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import environment from '../environment';

interface CreateContactMessageParameters {
  name: string;
  email: string;
  message: string;
}

async function createContactMessage(input: CreateContactMessageParameters) {
  return new Promise((resolve, reject) => {
    commitMutation<any>(environment, {
      mutation: graphql`
        mutation createContactMessageMutation($input: NewContactMessage!) {
          createContactMessage(input: $input) {
            id
          }
        }
      `,
      variables: {input},
      onCompleted: (response: any) => {
        resolve(response.createContactMessage)
      },
      onError: (error) => reject(error),
    });
  });
}

export default createContactMessage;

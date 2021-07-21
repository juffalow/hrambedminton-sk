import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'PlayersOrderField',
  values: {
    FIRST_NAME: {
      value: 'firstName',
    },
    LAST_NAME: {
      value: 'lastName',
    },
    CREATED_AT: {
      value: 'createdAt',
    },
  },
});

import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'GamesOrderField',
  values: {
    CREATED_AT: {
      value: 'createdAt',
    },
  },
});

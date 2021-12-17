import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'GameType',
  values: {
    SINGLES: {
      value: 'SINGLES',
    },
    DOUBLES: {
      value: 'DOUBLES',
    },
    MIX: {
      value: 'MIX',
    },
    OTHER: {
      value: 'OTHER',
    },
  },
});

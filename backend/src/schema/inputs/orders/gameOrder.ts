import {
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';
import gamesOrderField from '../../enums/gamesOrderField';
import direction from '../../enums/direction';

const gamesOrder = new GraphQLInputObjectType({
  name: 'GamesOrder',
  fields: {
    field: {
      type: new GraphQLNonNull(gamesOrderField),
    },
    direction: {
      type: new GraphQLNonNull(direction),
    },
  },
});

export default gamesOrder;

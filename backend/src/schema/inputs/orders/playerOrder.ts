import {
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';
import playersOrderField from '../../enums/playersOrderField';
import direction from '../../enums/direction';

const playersOrder = new GraphQLInputObjectType({
  name: 'PlayersOrder',
  fields: {
    field: {
      type: new GraphQLNonNull(playersOrderField),
    },
    direction: {
      type: new GraphQLNonNull(direction),
    },
  },
});

export default playersOrder;

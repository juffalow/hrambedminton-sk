import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { GraphQLResolveInfo } from 'graphql';
import Context from '../../context/Context';

const set = new GraphQLObjectType({
  name: 'Set',
  fields: () => ({
    team1Score: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: (obj: GameSet): number => {
        return obj.team1Score;
      },
    },
    team2Score: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: (obj: GameSet): number => {
        return obj.team2Score;
      },
    },
  }),
});

export default set;

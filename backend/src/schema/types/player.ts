import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLResolveInfo } from 'graphql';
import { formatDate, getDateFormat } from '../../utils/functions';
import Context from '../../context/Context';

const player = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: Player): string => {
        return Buffer.from(`player-${obj.id}`).toString('base64');
      },
    },
    _id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: Player): string => {
        return obj.id;
      },
    },
    firstName: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: Player): string => {
        return obj.firstName;
      },
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: Player): string => {
        return obj.lastName;
      },
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: Player, args: unknown, context: Context, info: GraphQLResolveInfo): string => {
        return formatDate(new Date(obj.createdAt), getDateFormat(info));
      },
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: Player, args: unknown, context: Context, info: GraphQLResolveInfo): string => {
        return formatDate(new Date(obj.updatedAt), getDateFormat(info));
      },
    },
  }),
});

export default player;

import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLResolveInfo } from 'graphql';
import { default as gameSet } from './set';
import { formatDate, getDateFormat } from '../../utils/functions';
import Context from '../../context/Context';

const game = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: Game): string => {
        return Buffer.from(`game-${obj.id}`).toString('base64');
      },
    },
    _id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: Game): string => {
        return obj.id;
      },
    },
    sets: {
      type: GraphQLNonNull(GraphQLList(gameSet)),
      resolve: (obj: Game): GameSet[] => {
        return obj.sets;
      },
    },
    note: {
      type: GraphQLString,
      resolve: (obj: Game): string => {
        return obj.note;
      },
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: Game, args: unknown, context: Context, info: GraphQLResolveInfo): string => {
        return formatDate(new Date(obj.createdAt), getDateFormat(info));
      },
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: Game, args: unknown, context: Context, info: GraphQLResolveInfo): string => {
        return formatDate(new Date(obj.updatedAt), getDateFormat(info));
      },
    },
  }),
});

export default game;

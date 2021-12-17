import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLResolveInfo } from 'graphql';
import { formatDate, getDateFormat } from '../../utils/functions';
import Context from '../../context/Context';

const place = new GraphQLObjectType({
  name: 'Place',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: Place): string => {
        return Buffer.from(`place-${obj.id}`).toString('base64');
      },
    },
    _id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: Place): string => {
        return obj.id;
      },
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: Place): string => {
        return obj.name;
      },
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: Place, args: unknown, context: Context, info: GraphQLResolveInfo): string => {
        return formatDate(new Date(obj.createdAt), getDateFormat(info));
      },
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: Place, args: unknown, context: Context, info: GraphQLResolveInfo): string => {
        return formatDate(new Date(obj.updatedAt), getDateFormat(info));
      },
    },
  }),
});

export default place;

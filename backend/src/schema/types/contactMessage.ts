import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLResolveInfo } from 'graphql';
import { formatDate, getDateFormat } from '../../utils/functions';
import Context from '../../context/Context';

const contactMessage = new GraphQLObjectType({
  name: 'ContactMessage',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: ContactMessage): string => {
        return Buffer.from(`contactmessage-${obj.id}`).toString('base64');
      },
    },
    _id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: ContactMessage): string => {
        return obj.id;
      },
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: ContactMessage): string => {
        return obj.name;
      },
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: ContactMessage): string => {
        return obj.email;
      },
    },
    message: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: ContactMessage): string => {
        return obj.message;
      },
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: ContactMessage, args: unknown, context: Context, info: GraphQLResolveInfo): string => {
        return formatDate(new Date(obj.createdAt), getDateFormat(info));
      },
    },
  }),
});

export default contactMessage;

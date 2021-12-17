import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLResolveInfo } from 'graphql';
import { formatDate, getDateFormat } from '../../utils/functions';
import Context from '../../context/Context';

const mailLog = new GraphQLObjectType({
  name: 'MailLog',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: MailLog): string => {
        return Buffer.from(`maillog-${obj.id}`).toString('base64');
      },
    },
    _id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (obj: MailLog): string => {
        return obj.id;
      },
    },
    fromEmail: {
      type: GraphQLString,
      resolve: (obj: MailLog): string => {
        return obj.fromEmail;
      },
    },
    fromName: {
      type: GraphQLString,
      resolve: (obj: MailLog): string => {
        return obj.fromName;
      },
    },
    replyToEmail: {
      type: GraphQLString,
      resolve: (obj: MailLog): string => {
        return obj.replyToName;
      },
    },
    replyToName: {
      type: GraphQLString,
      resolve: (obj: MailLog): string => {
        return obj.replyToEmail;
      },
    },
    addresses: {
      type: GraphQLList(GraphQLString),
      resolve: (obj: MailLog): string[] => {
        return obj.addresses;
      },
    },
    subject: {
      type: GraphQLString,
      resolve: (obj: MailLog): string => {
        return obj.subject;
      },
    },
    body: {
      type: GraphQLString,
      resolve: (obj: MailLog): string => {
        return obj.body;
      },
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: MailLog, args: unknown, context: Context, info: GraphQLResolveInfo): string => {
        return formatDate(new Date(obj.createdAt), getDateFormat(info));
      },
    },
    sentAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj: MailLog, args: unknown, context: Context, info: GraphQLResolveInfo): string => {
        return formatDate(new Date(obj.sentAt), getDateFormat(info));
      },
    },
  }),
});

export default mailLog;

import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import playerOrder from '../inputs/orders/playerOrder';
import Context from '../../context/Context';
import mailLogConnection from '../types/connections/mailLogConnection';
import nodesToEdges from './nodesToEdges';
import toConnection from './toConnection';
import logger from '../../logger';

interface MailLogsQueryArguments {
  first: number;
  after: string;
  address: string;
  subject: string;
  createdAt: {
    from: string;
    to: string;
  };
  orderBy: OrderBy[];
}

export default {
  mailLogs: {
    type: mailLogConnection,
    args: {
      first: {
        defaultValue: 10,
        description: 'Limits the number of results returned in the page. Defaults to 10.',
        type: GraphQLInt,
      },
      after: {
        defaultValue: 'Y3Vyc29yMA==', // base64encode('cursor0')
        description: 'The cursor value of an item returned in previous page. An alternative to in integer offset.',
        type: GraphQLString,
      },
      address: {
        type: GraphQLString,
      },
      subject: {
        type: GraphQLString,
      },
      orderBy: {
        type: GraphQLList(playerOrder),
      },
    },
    resolve: async (_, args: MailLogsQueryArguments, context: Context): Promise<any> => {
      logger.debug('MailLogsQuery', args);

      const after = typeof args.after === 'undefined' || args.after === null ? 0 : parseInt(Buffer.from(args.after, 'base64').toString('ascii').replace('cursor', ''), 10);

      const mailLogs = await context.repositories.mailLog.find({
        first: args.first,
        offset: after,
        address: args.address,
        subject: args.subject,
        orderBy: args.orderBy,
      });

      const count = await context.repositories.mailLog.count({
        address: args.address,
        subject: args.subject,
      });

      const edges = nodesToEdges(mailLogs, after);

      return toConnection(edges, count, edges.length === args.first, after > 0);
    },
  },
};
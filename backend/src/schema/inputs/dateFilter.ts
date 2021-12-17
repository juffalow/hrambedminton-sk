import {
  GraphQLInputObjectType,
} from 'graphql';
import GraphQLDateTime from '../types/GraphQLDateTime';

const dateFilter = new GraphQLInputObjectType({
  name: 'DateFilter',
  fields: {
    from: {
      type: GraphQLDateTime,
    },
    to: {
      type: GraphQLDateTime,
    },
  },
});

export default dateFilter;

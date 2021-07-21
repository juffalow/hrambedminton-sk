import { GraphQLSchema, GraphQLIncludeDirective, GraphQLSkipDirective } from 'graphql';
import mutationType from './mutation';
import queryType from './query';
import formatDate from './directives/formatDate';

export default new GraphQLSchema({
  mutation: mutationType,
  query: queryType,
  directives: [
    GraphQLIncludeDirective,
    GraphQLSkipDirective,
    formatDate,
  ],
});

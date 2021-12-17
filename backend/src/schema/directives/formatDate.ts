import {
  GraphQLDirective,
  GraphQLNonNull,
  GraphQLString,
  DirectiveLocation,
} from 'graphql';

const formatDate = new GraphQLDirective({
  name: 'formatDate',
  description: '',
  locations: [
    DirectiveLocation.FIELD,
  ],
  args: {
    format: {
      type: new GraphQLNonNull(GraphQLString),
      description: '',
      defaultValue: 'yyyy-MM-dd H:i:s',
    }
  },
});

export default formatDate;

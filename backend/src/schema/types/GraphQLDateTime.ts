import { GraphQLScalarType } from 'graphql';
import { formatDate } from '../../utils/functions';

function serializeDate(value): string {
  if (value instanceof Date) {
    return formatDate(value);
  } else if (typeof value === 'number') {
    return formatDate(new Date(value));
  } else if (typeof value === 'string') {
    return formatDate(new Date(value));
  }
  return null;
}

function parseDate(value): string {
  if (value === null) {
    return null;
  }

  try {
    const date = new Date(value);
    if (date instanceof Date && !isNaN(Number(date))) {
      return formatDate(date);
    }
  } catch (err) {
    console.log('Error, returning null');
  }
  return null;
}

function parseDateFromLiteral(ast): string {
  return parseDate(ast.value);
}

const GraphQLDateTime = new GraphQLScalarType({
  name: 'GraphQLDateTime',
  description: 'Any valid date and time. For example 2020-05-14 13:33:43.',
  serialize: serializeDate,
  parseValue: parseDate,
  parseLiteral: parseDateFromLiteral,
});

export default GraphQLDateTime;

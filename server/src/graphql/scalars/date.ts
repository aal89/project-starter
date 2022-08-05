import { GraphQLScalarType, Kind } from 'graphql';
import { env } from '../../env';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: Date) {
    return value.toLocaleString(env.dateLocale());
  },
  parseValue(value: string) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

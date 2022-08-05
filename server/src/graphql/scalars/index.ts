import { gql } from 'apollo-server-express';
import { dateScalar } from './date';

export const scalarTypeDefs = gql`
  scalar Date
  scalar Void
`;

export const scalarResolvers = {
  Date: dateScalar,
};

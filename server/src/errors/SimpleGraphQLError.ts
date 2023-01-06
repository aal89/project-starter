import { errorCode } from '@project-starter/shared/build';
import { GraphQLError } from 'graphql';

export abstract class SimpleGraphQLError extends GraphQLError {
  constructor(message: string, extensions?: ReturnType<ReturnType<typeof errorCode>>) {
    super(message, null, null, null, null, null, extensions);
  }
}

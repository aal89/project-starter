import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class StatsRetrievalError extends SimpleGraphQLError {
  constructor() {
    super('User is not allowed to retrieve stats.', errors.StatsRetrieval());
  }
}

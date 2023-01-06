import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class UnknownUserError extends SimpleGraphQLError {
  constructor() {
    super('Unknown user.', errors.UnknownUser());
  }
}

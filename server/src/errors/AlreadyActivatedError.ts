import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class AlreadyActivatedError extends SimpleGraphQLError {
  constructor() {
    super('This account is already activated.', errors.AlreadyActivated());
  }
}

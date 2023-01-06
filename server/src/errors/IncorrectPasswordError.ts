import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class IncorrectPasswordError extends SimpleGraphQLError {
  constructor() {
    super('Incorrect username and password combination.', errors.IncorrectPassword());
  }
}

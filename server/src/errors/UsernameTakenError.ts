import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class UsernameTakenError extends SimpleGraphQLError {
  constructor() {
    super('This username is already taken, please pick another.', errors.UsernameTaken());
  }
}

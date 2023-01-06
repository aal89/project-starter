import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class UsernameLengthError extends SimpleGraphQLError {
  constructor() {
    super('Username needs to be at least 4 characters.', errors.UsernameLength());
  }
}

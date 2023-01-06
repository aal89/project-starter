import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class EmailAddressTakenError extends SimpleGraphQLError {
  constructor() {
    super('This email address is already taken, please pick another.', errors.EmailAddressTaken());
  }
}

import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class PasswordConstraintError extends SimpleGraphQLError {
  constructor() {
    super('New password cannot be the same as your old password.', errors.PasswordConstraint());
  }
}

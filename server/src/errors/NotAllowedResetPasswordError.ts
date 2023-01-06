import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class NotAllowedResetPasswordError extends SimpleGraphQLError {
  constructor() {
    super('User is not allowed to reset passwords.', errors.NotAllowedResetPassword());
  }
}

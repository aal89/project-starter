import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class IncorrectOTPError extends SimpleGraphQLError {
  constructor() {
    super('Incorrect code.', errors.IncorrectOtp());
  }
}

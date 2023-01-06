import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class OnlyNewActivationError extends SimpleGraphQLError {
  constructor() {
    super('You can only activate new accounts.', errors.OnlyNewActivation());
  }
}

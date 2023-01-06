import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class NotAllowedDeleteAccountsError extends SimpleGraphQLError {
  constructor() {
    super('User is not allowed to delete accounts.', errors.NotAllowedDeleteAccounts());
  }
}

import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class DeleteOwnAccountError extends SimpleGraphQLError {
  constructor() {
    super('Cannot delete your own account.', errors.DeletingOwnAccount());
  }
}

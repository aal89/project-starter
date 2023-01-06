import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class NotAllowedListUsersError extends SimpleGraphQLError {
  constructor() {
    super('User is not allowed to list users.', errors.NotAllowedListUsers());
  }
}

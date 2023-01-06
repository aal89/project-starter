import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class UserLockedError extends SimpleGraphQLError {
  constructor(username: string) {
    super(
      `Account ${username} is locked`,
      errors.UserLocked({
        username,
      }),
    );
  }
}

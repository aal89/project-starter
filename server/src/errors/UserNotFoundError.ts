import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class UserNotFoundError extends SimpleGraphQLError {
  constructor(attribute: string) {
    super(
      `No user found by ${attribute}.`,
      errors.UserNotFound({
        attribute,
      }),
    );
  }
}

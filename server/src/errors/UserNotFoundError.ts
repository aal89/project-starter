import { formatMessage } from '../locales';

export class UserNotFoundError extends Error {
  constructor(attribute: string) {
    super(
      formatMessage('User.NotFound').interpolate({
        attribute,
      }),
    );
  }
}

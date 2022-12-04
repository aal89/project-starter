import { formatMessage } from '../locales';

export class UserLockedError extends Error {
  constructor(username: string) {
    super(
      formatMessage('User.Locked').interpolate({
        username,
      }),
    );
  }
}

import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class UserLockedError extends FormatError {
  constructor(username: string) {
    super(
      formatMessage('User.Locked', {
        username,
      }),
    );
  }
}

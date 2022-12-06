import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class UserNotFoundError extends FormatError {
  constructor(attribute: string) {
    super(
      formatMessage('User.NotFound', {
        attribute,
      }),
    );
  }
}

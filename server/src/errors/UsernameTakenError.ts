import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class UsernameTakenError extends FormatError {
  constructor() {
    super(formatMessage('User.UsernameTaken'));
  }
}

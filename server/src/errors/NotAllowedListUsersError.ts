import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class NotAllowedListUsersError extends FormatError {
  constructor() {
    super(formatMessage('User.NotAllowedToList'));
  }
}

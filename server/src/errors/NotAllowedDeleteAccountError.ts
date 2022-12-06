import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class NotAllowedDeleteAccountError extends FormatError {
  constructor() {
    super(formatMessage('User.NotAllowedToDeleteAccounts'));
  }
}

import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class NotAllowedResetPasswordError extends FormatError {
  constructor() {
    super(formatMessage('User.NotAllowedToResetPassword'));
  }
}

import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class IncorrectOTPError extends FormatError {
  constructor() {
    super(formatMessage('User.WrongOTP'));
  }
}

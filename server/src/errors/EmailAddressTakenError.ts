import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class EmailAddressTakenError extends FormatError {
  constructor() {
    super(formatMessage('User.EmailTaken'));
  }
}

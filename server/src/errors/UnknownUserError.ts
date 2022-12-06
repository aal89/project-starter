import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class UnknownUserError extends FormatError {
  constructor() {
    super(formatMessage('User.Unknown'));
  }
}

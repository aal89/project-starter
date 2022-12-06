import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class IncorrectPasswordError extends FormatError {
  constructor() {
    super(formatMessage('User.WrongPassword'));
  }
}

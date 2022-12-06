import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class UsernameLengthError extends FormatError {
  constructor() {
    super(formatMessage('User.NameConstraint'));
  }
}

import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class AlreadyActivatedError extends FormatError {
  constructor() {
    super(formatMessage('User.AlreadyActivated'));
  }
}

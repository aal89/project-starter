import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class DeleteOwnAccountError extends FormatError {
  constructor() {
    super(formatMessage('User.CantDeleteOwn'));
  }
}

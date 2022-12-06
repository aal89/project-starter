import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class PasswordConstraintError extends FormatError {
  constructor() {
    super(formatMessage('User.ChangePasswordConstraint'));
  }
}

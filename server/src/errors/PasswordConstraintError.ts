import { formatMessage } from '../locales';

export class PasswordConstraintError extends Error {
  constructor() {
    super(formatMessage('User.ChangePasswordConstraint').message);
  }
}

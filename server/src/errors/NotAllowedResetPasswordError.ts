import { formatMessage } from '../locales';

export class NotAllowedResetPasswordError extends Error {
  constructor() {
    super(formatMessage('User.NotAllowedToResetPassword').message);
  }
}

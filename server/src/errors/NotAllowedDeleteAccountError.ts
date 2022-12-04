import { formatMessage } from '../locales';

export class NotAllowedDeleteAccountError extends Error {
  constructor() {
    super(formatMessage('User.NotAllowedToDeleteAccounts').message);
  }
}

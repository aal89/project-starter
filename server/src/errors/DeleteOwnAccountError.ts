import { formatMessage } from '../locales';

export class DeleteOwnAccountError extends Error {
  constructor() {
    super(formatMessage('User.CantDeleteOwn').message);
  }
}

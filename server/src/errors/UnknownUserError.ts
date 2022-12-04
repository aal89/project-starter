import { formatMessage } from '../locales';

export class UnknownUserError extends Error {
  constructor() {
    super(formatMessage('User.Unknown').message);
  }
}

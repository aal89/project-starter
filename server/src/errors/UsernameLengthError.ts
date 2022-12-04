import { formatMessage } from '../locales';

export class UsernameLengthError extends Error {
  constructor() {
    super(formatMessage('User.NameConstraint').message);
  }
}

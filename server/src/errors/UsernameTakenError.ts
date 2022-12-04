import { formatMessage } from '../locales';

export class UsernameTakenError extends Error {
  constructor() {
    super(formatMessage('User.UsernameTaken').message);
  }
}

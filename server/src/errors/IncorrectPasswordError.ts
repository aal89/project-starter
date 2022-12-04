import { formatMessage } from '../locales';

export class IncorrectPasswordError extends Error {
  constructor() {
    super(formatMessage('User.WrongPassword').message);
  }
}

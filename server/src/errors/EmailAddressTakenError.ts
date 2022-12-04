import { formatMessage } from '../locales';

export class EmailAddressTakenError extends Error {
  constructor() {
    super(formatMessage('User.EmailTaken').message);
  }
}

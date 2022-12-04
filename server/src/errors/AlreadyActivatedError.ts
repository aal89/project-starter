import { formatMessage } from '../locales';

export class AlreadyActivatedError extends Error {
  constructor() {
    super(formatMessage('User.AlreadyActivated').message);
  }
}

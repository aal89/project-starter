import { formatMessage } from '../locales';

export class NotAllowedListUsersError extends Error {
  constructor() {
    super(formatMessage('User.NotAllowedToList').message);
  }
}

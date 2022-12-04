import { formatMessage } from '../locales';

export class OnlyNewActivationError extends Error {
  constructor() {
    super(formatMessage('User.OnlyNewActivation').message);
  }
}

import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class OnlyNewActivationError extends FormatError {
  constructor() {
    super(formatMessage('User.OnlyNewActivation'));
  }
}

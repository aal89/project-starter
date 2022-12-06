import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class StatsRetrievalError extends FormatError {
  constructor() {
    super(formatMessage('Stats.NotAllowed'));
  }
}

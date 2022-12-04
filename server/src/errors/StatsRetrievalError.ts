import { formatMessage } from '../locales';

export class StatsRetrievalError extends Error {
  constructor() {
    super(formatMessage('Stats.NotAllowed').message);
  }
}

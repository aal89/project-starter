import bunyan from 'bunyan';
import { v4 as uuidv4 } from 'uuid';

export const log = bunyan.createLogger({ name: 'server' });

export const createChildTraceLogger = () => {
  return log.child({ trace: uuidv4() });
};

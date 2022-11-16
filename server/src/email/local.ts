import { v4 as uuidv4 } from 'uuid';
import { log } from '../logger/log';
import { EmailService } from './EmailService';

log.info('Setting up local mail service');

export default {
  send: (_, to) => Promise.resolve({ messageId: uuidv4(), recipient: to }),
} as EmailService;

import { v4 as uuidv4 } from 'uuid';
import { EmailService } from './EmailService';

export default {
  send: (_, to) => Promise.resolve({ messageId: uuidv4(), recipient: to }),
} as EmailService;

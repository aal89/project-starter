import * as nodemailer from 'nodemailer';
import { env } from '../env';
import { log } from '../logger/log';
import { EmailService } from './EmailService';

log.info('Setting up TransIP mail service');

const smtpTransport = nodemailer.createTransport({
  pool: true,
  host: env.mail.host(),
  port: env.mail.port(),
  secure: false,
  auth: {
    user: env.mail.username(),
    pass: env.mail.password(),
  },
});

export default {
  send: (from, to, subject, text, html) => {
    return new Promise((resolve, reject) => {
      smtpTransport.sendMail({
        from, to, subject, text, html,
      }, (err, info) => {
        if (err) {
          return reject(err);
        }

        return resolve({
          messageId: info.messageId,
          recipient: to,
        });
      });
    });
  },
} as EmailService;

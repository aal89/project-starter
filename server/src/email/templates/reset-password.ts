import { env } from '../../env';
import { log } from '../../logger/log';
import { getEmailService } from '../EmailService';

export const sendResetPasswordMail = async (name: string, email: string, password: string) => {
  const mailService = await getEmailService();

  const body = `
  Hello ${name},
  <p>
  Your account password has been reset to: ${password}
  </p>
  Thank you,
  <br>
  ${env.projectName()}
  `;

  const result = await mailService.send(
    env.mail.from(),
    email,
    'New account password',
    body,
    body,
  );

  log.info(`ResetPassword mail sent success to ${result.recipient}. MessageId: ${result.messageId}`);

  return result;
};

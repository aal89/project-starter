import { User } from '../../entities/User';
import { env } from '../../env';
import { log } from '../../logger/log';
import { getEmailService } from '../EmailService';

const requestPasswordResetUrl = (username: string, code: string) => env.projectUrl(`user/password/${username}/${code}`);

export const sendRequestPasswordResetMail = async (user: User) => {
  const mailService = await getEmailService();
  const code = await user.getPasswordOtp();
  const url = requestPasswordResetUrl(user.username, code);

  const body = `
  Hello ${user.name},
  <p>
  You can reset your password <a href="${url}">here</a>.
  </p>
  Thank you,
  <br>
  ${env.projectName()}
  `;

  const result = await mailService.send(
    env.mail.from(),
    user.email,
    'New account password',
    body,
    body,
  );

  log.info(
    `RequestPasswordReset mail sent success to ${result.recipient}. MessageId: ${result.messageId}. Url: ${url}`,
  );

  return result;
};

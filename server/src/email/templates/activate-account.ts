import { User } from '../../entities/User';
import { env } from '../../env';
import { log } from '../../logger/log';
import { getEmailService } from '../EmailService';

const activateUrl = (username: string, code: string) => env.projectUrl(`user/activate/${username}/${code}`);

export const sendActivateAccountMail = async (user: User) => {
  const mailService = await getEmailService();
  const code = await user.getOtp();
  const url = activateUrl(user.username, code);

  const body = `
  Hello ${user.name},
  <p>
  Your account has been created, to activate it click the following <a href="${url}">link</a>.
  </p>
  <p>
  This link is valid for 24 hours.
  </p>
  Thank you,
  <br>
  ${env.projectName()}
  `;

  const result = await mailService.send(env.mail.from(), user.email, 'Activate account', body, body);

  log.info(
    `ActivateAccount mail sent success to ${result.recipient}. MessageId: ${result.messageId}. Url: ${url}`,
  );

  return result;
};

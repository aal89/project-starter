import { User } from '../../entities/User';
import { env } from '../../env';
import { formatMessage } from '../../locales';
import { log } from '../../logger/log';
import { getEmailService } from '../EmailService';

const requestPasswordResetUrl = (username: string, code: string) => env.projectUrl(`user/password/${username}/${code}`);

export const sendRequestPasswordResetMail = async (user: User) => {
  const mailService = await getEmailService();
  const code = await user.getPasswordOtp();
  const url = requestPasswordResetUrl(user.username, code);

  const { message: body } = formatMessage('Email.RequestPasswordReset', {
    username: user.name,
    url: url.toString(),
    senderName: env.projectName(),
  });

  const { message: subject } = formatMessage('Email.RequestPasswordReset.Subject');

  const result = await mailService.send(env.mail.from(), user.email, subject, body, body);

  log.info(
    `RequestPasswordReset mail sent success to ${result.recipient}. MessageId: ${result.messageId}. Url: ${url}`,
  );

  return result;
};

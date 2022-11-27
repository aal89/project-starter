import { User } from '../../entities/User';
import { env } from '../../env';
import { formatMessage } from '../../locales';
import { log } from '../../logger/log';
import { getEmailService } from '../EmailService';

const activateUrl = (username: string, code: string) => env.projectUrl(`user/activate/${username}/${code}`);

export const sendActivateAccountMail = async (user: User) => {
  const mailService = await getEmailService();
  const code = await user.getOtp();
  const url = activateUrl(user.username, code);

  const body = formatMessage('Email.Activate').interpolate({
    username: user.name,
    url: url.toString(),
    senderName: env.projectName(),
  });

  const { message: subject } = formatMessage('Email.Activate.Subject');

  const result = await mailService.send(env.mail.from(), user.email, subject, body, body);

  log.info(
    `ActivateAccount mail sent success to ${result.recipient}. MessageId: ${result.messageId}. Url: ${url}`,
  );

  return result;
};

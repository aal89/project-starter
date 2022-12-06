import { User } from '../../entities/User';
import { env } from '../../env';
import { formatMessage } from '../../locales';
import { log } from '../../logger/log';
import { getEmailService } from '../EmailService';

export const sendResetPasswordMail = async (user: User, password: string) => {
  const mailService = await getEmailService();

  const { message: body } = formatMessage('Email.ResetPassword', {
    username: user.name,
    password,
    senderName: env.projectName(),
  });

  const { message: subject } = formatMessage('Email.ResetPassword.Subject');

  const result = await mailService.send(env.mail.from(), user.email, subject, body, body);

  log.info(
    `ResetPassword mail sent success to ${result.recipient}. MessageId: ${result.messageId}`,
  );

  return result;
};

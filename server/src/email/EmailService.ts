import { env } from '../env';

type SentEmail = {
  messageId: string;
  recipient: string;
};

export interface EmailService {
  send: (
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
  ) => Promise<SentEmail>;
}

let instance: EmailService | null = null;

export const getEmailService = async () => {
  if (instance) {
    return instance;
  }

  if (env.isDevelopment()) {
    instance = (await import('./local')).default;

    return instance;
  }

  instance = (await import('./transip')).default;

  return instance;
};

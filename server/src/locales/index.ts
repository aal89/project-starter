import { env } from '../env';
import en from './en.json';
import nl from './nl.json';

type Language = 'en' | 'nl';
type Translations = Record<keyof typeof en, string>;

const locales: Record<Language, Translations> = {
  en,
  nl,
};

const interpolate = (message: string, substitutions: Record<string, string>) => {
  return message.replace(/\${(\w+)}/gm, (_, group) => substitutions[group] ?? '');
};

export const formatMessage = <T extends Record<string, string>>(
  id: keyof Translations,
  substitutions?: T,
  defaultLanguage: Language = 'en',
) => {
  const defaultMessage = locales[defaultLanguage][id];
  let message = '';

  try {
    message = locales[env.locale() as Language][id];
  } catch {
    message = defaultMessage;
  }

  return {
    message: substitutions ? interpolate(message, substitutions) : message,
    defaultMessage: substitutions ? interpolate(defaultMessage, substitutions) : defaultMessage,
  };
};

export default {
  formatMessage,
};

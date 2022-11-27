import { env } from '../env';
import en from './en.json';
import nl from './nl.json';

type Translations = Record<keyof typeof en, string>;

const locales: Record<string, Translations> = {
  en,
  nl,
};

export const formatMessage = <T extends Record<string, string>>(id: keyof Translations) => {
  return {
    message: locales[env.locale()][id] ?? locales.en[id],
    interpolate(substitutions: T, fallback = '') {
      try {
        return this.message.replace(/\${(\w+)}/gm, (_, group) => substitutions[group] ?? fallback);
      } catch {
        throw new Error(`Missing translation. (id: ${id})`);
      }
    },
  };
};

export default {
  formatMessage,
};

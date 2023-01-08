import React, { useCallback, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import en from '../locales/en.json';
import nl from '../locales/nl.json';

const messages = {
  nl,
  en,
};

type Message = keyof typeof messages;
const isMessageKey = (s: string): s is Message => Object.keys(messages).some((key) => key === s);

export const LocalizationProvider: React.FC = ({ children }) => {
  const getMessages = useCallback(
    (locale: string) => {
      const [language] = locale.split(/[-_]/);
      return isMessageKey(language) ? messages[language] : messages.en;
    },
    [messages],
  );

  const locale = useMemo(() => {
    if (process.env.REACT_APP_LOCALE) {
      return process.env.REACT_APP_LOCALE;
    }

    return navigator.language;
  }, [navigator.language]);

  return (
    <IntlProvider locale={locale} messages={getMessages(locale)}>
      {children}
    </IntlProvider>
  );
};

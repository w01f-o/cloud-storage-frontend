'use client';

import { Locale, Messages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import { ThemeInCookieProvider } from './ThemeInCookieProvider';

interface RootProviderProps {
  children: ReactNode;
  locale: Locale;
  messages: Messages;
}

export const RootProvider: FC<RootProviderProps> = ({
  children,
  locale,
  messages,
}) => {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone='Europe/Moscow'
    >
      <ThemeProvider enableSystem defaultTheme='light' enableColorScheme>
        <ThemeInCookieProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </ThemeInCookieProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

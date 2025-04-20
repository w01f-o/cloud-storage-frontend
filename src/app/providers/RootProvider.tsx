'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';

interface RootProviderProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
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
      <ThemeProvider>{children}</ThemeProvider>
    </NextIntlClientProvider>
  );
};

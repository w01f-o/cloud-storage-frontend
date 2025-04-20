import { routing } from '@/_shared/i18n';
import { BaseLayout } from '@/_shared/layouts';
import { RootProvider } from '@/app/providers/RootProvider';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import '../styles/globals.css';

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

const RootLayout: NextPage<RootLayoutProps> = async ({ children, params }) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [cookiesManager, messages] = await Promise.all([
    cookies(),
    getMessages(),
  ]);
  const theme = cookiesManager.get('theme')?.value;

  return (
    <html lang={locale} data-theme={theme} suppressHydrationWarning>
      <body className={clsx('bg-background text-foreground antialiased')}>
        <RootProvider locale={locale} messages={messages}>
          <BaseLayout>{children}</BaseLayout>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;

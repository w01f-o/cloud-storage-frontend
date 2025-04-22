import { routing } from '@/_shared/i18n';
import { BaseLayout } from '@/_shared/layouts';
import { RootProvider } from '@/app/providers/RootProvider';
import type { NextPage } from 'next';
import { hasLocale, Locale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { NextFont } from 'next/dist/compiled/@next/font';
import { Nunito_Sans } from 'next/font/google';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import '../styles/globals.css';

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

export const generateStaticParams = (): Awaited<RootLayoutProps['params']>[] =>
  routing.locales.map(locale => ({ locale }));

const nunitoSans: NextFont = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
});

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
      <body className={nunitoSans.className}>
        <RootProvider locale={locale} messages={messages}>
          <BaseLayout>{children}</BaseLayout>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;

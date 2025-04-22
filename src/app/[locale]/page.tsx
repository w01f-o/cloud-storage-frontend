import { HomePage } from '@/_pages/home';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t(`HomePage.title`),
  };
};

const Page: FC = () => {
  return <HomePage />;
};

export default Page;

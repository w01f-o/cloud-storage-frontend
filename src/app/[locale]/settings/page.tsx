import { SettingsPage } from '@/_pages/settings';
import { Metadata, NextPage } from 'next';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

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
    title: t(`SettingsPage.title`),
  };
};

const Page: NextPage = () => {
  return <SettingsPage />;
};

export default Page;

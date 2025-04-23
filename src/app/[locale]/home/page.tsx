import { HomePage } from '@/_pages/home';
import { generatePrefixedPageTitle } from '@/_shared/lib';
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
    title: generatePrefixedPageTitle(t(`HomePage.title`)),
  };
};

const Page: NextPage = () => {
  return <HomePage />;
};

export default Page;

import { SharedFilePage } from '@/_pages/shared-file';
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
    title: t(`HelpPage.title`),
  };
};

const Page: NextPage = () => {
  return <SharedFilePage />;
};

export default Page;

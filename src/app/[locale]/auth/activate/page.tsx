import { AuthType } from '@/_entities/auth';
import { ActivatePage } from '@/_pages/activate';
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
    title: generatePrefixedPageTitle(t('AuthPage.title.activate')),
  };
};

export const generateStaticParams = (): Omit<
  Awaited<PageProps['params']>,
  'locale'
>[] => Object.values(AuthType).map(type => ({ type }));

const Page: NextPage<PageProps> = () => {
  return <ActivatePage />;
};

export default Page;

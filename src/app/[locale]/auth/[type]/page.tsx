import { AuthType } from '@/_entities/auth';
import { AuthPage } from '@/_pages/auth';
import { generatePrefixedPageTitle } from '@/_shared/lib';
import { Metadata, NextPage } from 'next';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{
    type: AuthType;
    locale: Locale;
  }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { type, locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: generatePrefixedPageTitle(t(`AuthPage.actions.${type}`)),
  };
};

export const generateStaticParams = (): Omit<
  Awaited<PageProps['params']>,
  'locale'
>[] => Object.values(AuthType).map(type => ({ type }));

const Page: NextPage<PageProps> = async ({ params }) => {
  const { type } = await params;

  return <AuthPage type={type} />;
};

export default Page;

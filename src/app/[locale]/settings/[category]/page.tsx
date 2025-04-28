import { SettingsPage } from '@/_pages/settings';
import { SettingsTabValue } from '@/_pages/settings/model/enums/tabs-value.enum';
import { generatePrefixedPageTitle } from '@/_shared/lib';
import { Metadata, NextPage } from 'next';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{
    locale: Locale;
    category: SettingsTabValue;
  }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: generatePrefixedPageTitle(t(`SettingsPage.title`)),
  };
};

export const generateStaticParams = (): Pick<
  Awaited<PageProps['params']>,
  'category'
>[] => {
  return Object.entries(SettingsTabValue).map(([_, value]) => ({
    category: value,
  }));
};

const Page: NextPage<PageProps> = async ({ params }) => {
  const { category } = await params;

  return <SettingsPage tabValue={category} />;
};

export default Page;

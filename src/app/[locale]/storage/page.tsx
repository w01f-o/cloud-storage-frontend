import { getUserStorageQueryOptions } from '@/_entities/storage';
import { StoragePage } from '@/_pages/storage';
import { generatePrefixedPageTitle } from '@/_shared/lib';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
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
    title: generatePrefixedPageTitle(t(`StoragePage.title`)),
  };
};

const Page: NextPage = () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(getUserStorageQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoragePage />
    </HydrationBoundary>
  );
};

export default Page;

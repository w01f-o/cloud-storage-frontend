import { getInfiniteFolderListQueryOptions } from '@/_entities/folder/config/query-options/getInfiniteFolderListQueryOptions';
import { HomePage } from '@/_pages/home';
import { generatePrefixedPageTitle } from '@/_shared/lib';
import { FolderListLoader } from '@/_widgets/folder';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata, NextPage } from 'next';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

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

const Page: NextPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(getInfiniteFolderListQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<FolderListLoader />}>
        <HomePage />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;

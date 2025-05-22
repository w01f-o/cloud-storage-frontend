import { getInfiniteFolderFilesQueryOptions } from '@/_entities/file';
import { getFolderQueryOptions } from '@/_entities/folder';
import { FolderPage } from '@/_pages/folder';
import { generatePrefixedPageTitle } from '@/_shared/lib';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata, NextPage } from 'next';
import { Locale } from 'next-intl';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
    locale: Locale;
  }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const queryClient = new QueryClient();
  const { id } = await params;

  try {
    const folder = await queryClient.fetchQuery(getFolderQueryOptions({ id }));

    return {
      title: generatePrefixedPageTitle(folder.name),
    };
  } catch {
    notFound();
  }
};

const Page: NextPage<PageProps> = async ({ params }) => {
  const queryClient = new QueryClient();
  const { id } = await params;

  try {
    await Promise.all([
      queryClient.fetchInfiniteQuery(
        getInfiniteFolderFilesQueryOptions({ folderId: id })
      ),
      queryClient.fetchQuery(getFolderQueryOptions({ id })),
    ]);
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderPage />
    </HydrationBoundary>
  );
};

export default Page;

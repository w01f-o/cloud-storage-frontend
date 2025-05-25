import { getSharedFileQueryOptions } from '@/_entities/shared-file/config/query-options/get-shared-file-query-options';
import { OneSharedFilePage } from '@/_pages/shared-files/ui/OneSharedFilePage';
import { generatePrefixedPageTitle } from '@/_shared/lib';
import { QueryClient } from '@tanstack/react-query';
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
    const sharedFile = await queryClient.fetchQuery(
      getSharedFileQueryOptions({ id })
    );

    if (!sharedFile) notFound();

    return {
      title: generatePrefixedPageTitle(sharedFile.file.displayName),
    };
  } catch {
    notFound();
  }
};

const Page: NextPage = () => {
  return <OneSharedFilePage />;
};

export default Page;

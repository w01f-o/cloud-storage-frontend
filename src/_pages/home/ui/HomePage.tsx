'use client';

import { FolderList, FolderListLoader } from '@/_entities/folder';
import { useInfiniteFolderList } from '@/_entities/folder/lib/hooks/useInfiniteFolderList';
import { FoldersSearchField } from '@/_features/folders-search';
import { useInfiniteScroll } from '@/_shared/lib/hooks/useInfiniteScroll';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export const HomePage: FC = () => {
  const searchParams = useSearchParams();
  const {
    data: folders,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteFolderList(
    { perPage: 36 },
    { select: data => data.pages.flatMap(folder => folder.list) }
  );

  const cursorRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    rootMargin: '200px',
  });

  return (
    <>
      <div className='pt-6 pb-4'>
        <FoldersSearchField />
      </div>
      {isSuccess && <FolderList folders={folders} />}
      {(isFetchingNextPage || isLoading) && <FolderListLoader />}
      <div ref={cursorRef} className='h-2 w-full'></div>
    </>
  );
};

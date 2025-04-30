'use client';

import { useInfiniteFolderList } from '@/_entities/folder';
import { FoldersSearchField } from '@/_features/folders-search';
import { useInfiniteScroll } from '@/_shared/lib';
import { FolderList, FolderListLoader } from '@/_widgets/folder';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export const HomePage: FC = () => {
  const searchParams = useSearchParams();
  const {
    data: folders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteFolderList(
    { perPage: 36 },
    { select: data => data.pages.flatMap(folder => folder.list) }
  );

  const cursorRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      <div className='pt-6 pb-4'>
        <FoldersSearchField />
      </div>
      <FolderList folders={folders} cursorRef={cursorRef} />
      {isFetchingNextPage && <FolderListLoader />}
    </>
  );
};

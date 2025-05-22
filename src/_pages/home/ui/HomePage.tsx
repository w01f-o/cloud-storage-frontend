'use client';

import { useInfiniteFolderList } from '@/_entities/folder';
import {
  FOLDERS_SEARCH_QUERY_KEY,
  FoldersSearchField,
} from '@/_features/folder';
import { useInfiniteScroll } from '@/_shared/lib';
import { FolderList, FolderListLoader } from '@/_widgets/folder';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';

export const HomePage: FC = () => {
  const searchParams = useSearchParams();
  const {
    data: folders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isSuccess,
  } = useInfiniteFolderList(
    { perPage: 36, search: searchParams.get(FOLDERS_SEARCH_QUERY_KEY) },
    { select: data => data.pages.flatMap(folder => folder.list) }
  );
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const cursorRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      <div className='pt-6 pb-4'>
        <FoldersSearchField setIsSearching={setIsSearching} />
      </div>
      {isPending || isSearching ? (
        <FolderListLoader />
      ) : (
        <>
          {isSuccess && <FolderList folders={folders} cursorRef={cursorRef} />}
          {isFetchingNextPage && <FolderListLoader />}
        </>
      )}
    </>
  );
};

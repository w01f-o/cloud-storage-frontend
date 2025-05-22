'use client';

import { useInfiniteFolderList } from '@/_entities/folder';
import {
  FOLDERS_SEARCH_QUERY_KEY,
  FoldersSearchField,
} from '@/_features/folder';
import { CreateFormModal } from '@/_features/folder/create/ui/CreateFormModal';
import { useInfiniteScroll } from '@/_shared/lib';
import { FolderList, FolderListLoader } from '@/_widgets/folder';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';

export const HomePage: FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get(FOLDERS_SEARCH_QUERY_KEY) ?? '';

  const [isSearching, setIsSearching] = useState(false);

  const {
    data: folders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isSuccess,
  } = useInfiniteFolderList(
    { perPage: 36, search: searchQuery },
    { select: data => data.pages.flatMap(folder => folder.list) }
  );

  const cursorRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  const shouldShowLoader = isPending || isSearching;
  const isEmpty = !folders?.length;

  return (
    <div className='h-full pt-6 pb-4'>
      <FoldersSearchField setIsSearching={setIsSearching} />

      {shouldShowLoader && <FolderListLoader />}

      {!shouldShowLoader && isEmpty && (
        <>
          <div className='flex h-[80%] flex-col items-center justify-center gap-6 text-5xl'>
            У вас ещё нет папок
            <CreateFormModal />
          </div>
        </>
      )}

      {isSuccess && !isEmpty && (
        <div className='py-8'>
          <FolderList folders={folders} cursorRef={cursorRef} />
          {isFetchingNextPage && <FolderListLoader />}
          <div className='flex w-full justify-center pt-6'>
            <CreateFormModal />
          </div>
        </div>
      )}
    </div>
  );
};

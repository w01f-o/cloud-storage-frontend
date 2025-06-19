import { Folder, useInfiniteFolderList } from '@/_entities/folder';
import { useFolderSearchValue } from '@/_features/folder';
import { useInfiniteScroll } from '@/_shared/lib';
import { Dispatch, Ref, SetStateAction, useState } from 'react';

interface UseHomePageReturn {
  shouldShowLoader: boolean;
  isEmpty: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  isFetchingNextPage: boolean;
  cursorRef: Ref<HTMLDivElement>;
  searchQuery: string;
  folderList: Folder[];
}

export const useHomePage = (): UseHomePageReturn => {
  const searchQuery = useFolderSearchValue();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteFolderList(
      { perPage: 35, search: searchQuery },
      { select: data => data.pages.flatMap(folder => folder.list) }
    );

  const cursorRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  const shouldShowLoader = isPending || isSearching;
  const isEmpty = !data.length;

  return {
    shouldShowLoader,
    isEmpty,
    setIsSearching,
    cursorRef,
    searchQuery,
    folderList: data,
    isFetchingNextPage,
  };
};

import { PaginatedResult } from '@/_shared/model';
import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { Folder, FolderQueryKeys } from '../../model';

export const getPreviousFolderQueries = (
  queryClient: QueryClient,
  id: string
) => {
  const previousFolderList = queryClient.getQueriesData<
    PaginatedResult<Folder> | undefined
  >({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FolderQueryKeys.LIST,
  });
  const previousFolderInfiniteList = queryClient.getQueriesData<
    InfiniteData<PaginatedResult<Folder>>
  >({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FolderQueryKeys.INFINITE,
  });
  const previousFolder = queryClient.getQueriesData<Folder | undefined>({
    queryKey: [FolderQueryKeys.FIND_ONE, id],
  });

  return {
    previousFolderList,
    previousFolderInfiniteList,
    previousFolder,
  };
};

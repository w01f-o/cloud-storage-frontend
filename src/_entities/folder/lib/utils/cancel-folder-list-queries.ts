import { QueryClient } from '@tanstack/react-query';
import { FolderQueryKeys } from '../../model';

export const cancelFolderListQueries = async (
  queryClient: QueryClient
): Promise<void> => {
  queryClient.cancelQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FolderQueryKeys.LIST,
  });
  queryClient.cancelQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FolderQueryKeys.INFINITE,
  });
};

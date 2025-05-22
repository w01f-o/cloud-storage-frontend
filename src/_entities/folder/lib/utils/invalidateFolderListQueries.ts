import { QueryClient } from '@tanstack/react-query';
import { FolderQueryKeys } from '../../model';

export const invalidateFolderListQueries = async (
  queryClient: QueryClient
): Promise<void> => {
  queryClient.invalidateQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FolderQueryKeys.LIST,
  });
  queryClient.invalidateQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FolderQueryKeys.INFINITE,
  });
};

import { QueryClient } from '@tanstack/react-query';
import { FolderQueryKeys } from '../../model';

export const invalidateFolderListQueries = async (
  queryClient: QueryClient
): Promise<void> => {
  queryClient.invalidateQueries({
    predicate: query => {
      if (!Array.isArray(query.queryKey)) return false;

      const queryKey = query.queryKey[0];

      return (
        queryKey === FolderQueryKeys.LIST ||
        queryKey === FolderQueryKeys.INFINITE
      );
    },
  });
};

import { QueryClient } from '@tanstack/react-query';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';

export const invalidateFileListQueries = async (
  queryClient: QueryClient
): Promise<void> =>
  queryClient.invalidateQueries({
    predicate: query => {
      if (!Array.isArray(query.queryKey)) return false;

      const queryKey = query.queryKey[0];

      return (
        queryKey === FileQueryKeys.LIST ||
        queryKey === FileQueryKeys.INFINITE ||
        queryKey === FileQueryKeys.FOLDER_LIST ||
        queryKey === FileQueryKeys.INFINITE_FOLDER_LIST
      );
    },
  });

import { QueryClient } from '@tanstack/react-query';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';

export const invalidateFileListQueries = async (
  queryClient: QueryClient
): Promise<void> => {
  Promise.all([
    queryClient.invalidateQueries({
      predicate: query =>
        Array.isArray(query.queryKey) &&
        (query.queryKey[0] === FileQueryKeys.LIST ||
          query.queryKey[0] === FileQueryKeys.INFINITE ||
          query.queryKey[0] === FileQueryKeys.FOLDER_LIST ||
          query.queryKey[0] === FileQueryKeys.INFINITE_FOLDER_LIST),
    }),
  ]);
};

import { QueryClient } from '@tanstack/react-query';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';

export const invalidateFileListQueries = async (
  queryClient: QueryClient
): Promise<void> =>
  queryClient.invalidateQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      (query.queryKey[0] === FileQueryKeys.LIST ||
        query.queryKey[0] === FileQueryKeys.INFINITE_LIST),
  });

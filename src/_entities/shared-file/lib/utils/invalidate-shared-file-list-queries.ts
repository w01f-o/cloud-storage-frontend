import { QueryClient } from '@tanstack/react-query';
import { SharedFileQueryKeys } from '../../model/enums/query-keys.enum';

export const invalidateSharedFileListQueries = (queryClient: QueryClient) =>
  queryClient.refetchQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === SharedFileQueryKeys.LIST,
  });

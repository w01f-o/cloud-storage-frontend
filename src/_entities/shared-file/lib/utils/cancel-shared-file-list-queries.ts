import { QueryClient } from '@tanstack/react-query';
import { SharedFileQueryKeys } from '../../model/enums/query-keys.enum';

export const cancelSharedFileListQueries = (queryClient: QueryClient) =>
  queryClient.cancelQueries({
    predicate: query => {
      if (!Array.isArray(query.queryKey)) return false;

      const { queryKey } = query;

      return (
        queryKey[0] === SharedFileQueryKeys.LIST ||
        queryKey[0] === SharedFileQueryKeys.FIND_ONE
      );
    },
  });

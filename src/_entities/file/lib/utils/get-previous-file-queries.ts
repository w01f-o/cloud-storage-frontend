import { SharedFile, SharedFileQueryKeys } from '@/_entities/shared-file';
import { PaginatedResult } from '@/_shared/model';
import { QueryClient } from '@tanstack/react-query';
import { FileQueryKeys } from '../../model';

export const getPreviousFileQueries = (
  queryClient: QueryClient,
  id: string
) => {
  const previousFileList = queryClient.getQueriesData<PaginatedResult<File>>({
    predicate: query =>
      Array.isArray(query.queryKey) && query.queryKey[0] === FileQueryKeys.LIST,
  });
  const previousFile = queryClient.getQueriesData<File>({
    queryKey: [FileQueryKeys.FIND_ONE, id],
  });

  const previousSharedFile = queryClient.getQueriesData<SharedFile>({
    queryKey: [SharedFileQueryKeys.FIND_ONE, id],
  });
  const previousSharedFileList = queryClient.getQueriesData<
    PaginatedResult<SharedFile>
  >({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === SharedFileQueryKeys.LIST,
  });

  return {
    previousFileList,
    previousFile,
    previousSharedFile,
    previousSharedFileList,
  };
};

import { QueryClient } from '@tanstack/react-query';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';

export const cancelFileListQueries = async (
  queryClient: QueryClient
): Promise<void> => {
  queryClient.cancelQueries({
    predicate: query =>
      Array.isArray(query.queryKey) && query.queryKey[0] === FileQueryKeys.LIST,
  });
  queryClient.cancelQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FileQueryKeys.INFINITE,
  });
  queryClient.cancelQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FileQueryKeys.INFINITE,
  });
  queryClient.cancelQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FileQueryKeys.FOLDER_LIST,
  });
  queryClient.cancelQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] === FileQueryKeys.INFINITE_FOLDER_LIST,
  });
};

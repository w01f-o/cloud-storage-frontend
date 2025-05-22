import { QueryClient } from '@tanstack/react-query';
import { SharedFileQueryKeys } from '../../model/enums/query-keys.enum';

export const invalidateSharedFileListQueries = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({
    queryKey: [SharedFileQueryKeys.LIST],
  });

import { QueryClient } from '@tanstack/react-query';
import { SharedFileQueryKeys } from '../../model/enums/query-keys.enum';
import { SharedFile } from '../../model/types/shared-file.type';

export const invalidateSharedFileQueries = (
  queryClient: QueryClient,
  id: SharedFile['id']
) =>
  queryClient.invalidateQueries({
    queryKey: [SharedFileQueryKeys.FIND_ONE, id],
  });

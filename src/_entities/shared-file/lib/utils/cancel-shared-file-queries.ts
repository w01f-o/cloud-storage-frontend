import { QueryClient } from '@tanstack/react-query';
import { SharedFileQueryKeys } from '../../model/enums/query-keys.enum';
import { SharedFile } from '../../model/types/shared-file.type';

export const cancelSharedFileQueries = (
  queryClient: QueryClient,
  id: SharedFile['id']
) =>
  queryClient.cancelQueries({ queryKey: [SharedFileQueryKeys.FIND_ONE, id] });

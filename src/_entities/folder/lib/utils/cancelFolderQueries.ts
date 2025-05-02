import { QueryClient } from '@tanstack/react-query';
import { FolderQueryKeys } from '../../model';

export const cancelFolderQueries = async (
  queryClient: QueryClient,
  id: string
): Promise<void> =>
  queryClient.cancelQueries({
    queryKey: [FolderQueryKeys.FIND_ONE, id],
  });

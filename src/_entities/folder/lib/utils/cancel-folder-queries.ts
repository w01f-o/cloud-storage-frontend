import { QueryClient } from '@tanstack/react-query';
import { Folder, FolderQueryKeys } from '../../model';

export const cancelFolderQueries = async (
  queryClient: QueryClient,
  id: Folder['id']
): Promise<void> =>
  queryClient.cancelQueries({
    queryKey: [FolderQueryKeys.FIND_ONE, id],
  });

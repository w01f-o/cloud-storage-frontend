import { QueryClient } from '@tanstack/react-query';
import { Folder, FolderQueryKeys } from '../../model';

export const invalidateFolderQueries = async (
  queryClient: QueryClient,
  id: Folder['id']
): Promise<void> =>
  queryClient.invalidateQueries({
    queryKey: [FolderQueryKeys.FIND_ONE, id],
  });

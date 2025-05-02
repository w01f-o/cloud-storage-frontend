import { QueryClient } from '@tanstack/react-query';
import { FolderQueryKeys } from '../../model';

export const invalidateFolderQueries = async (
  queryClient: QueryClient,
  id: string
): Promise<void> =>
  queryClient.invalidateQueries({
    queryKey: [FolderQueryKeys.FIND_ONE, id],
  });

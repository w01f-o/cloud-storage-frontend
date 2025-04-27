import { QueryClient } from '@tanstack/react-query';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';

export const cancelFileQueries = async (
  queryClient: QueryClient,
  id: string
): Promise<void> =>
  queryClient.cancelQueries({
    queryKey: [FileQueryKeys.FIND_ONE, id],
  });

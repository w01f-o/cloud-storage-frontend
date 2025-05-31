import { QueryClient } from '@tanstack/react-query';
import { File } from '../../model';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';

export const cancelFileQueries = async (
  queryClient: QueryClient,
  id: File['id']
): Promise<void> =>
  queryClient.cancelQueries({
    queryKey: [FileQueryKeys.FIND_ONE, id],
  });

import { QueryClient } from '@tanstack/react-query';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';

export const invalidateFileQueries = async (
  queryClient: QueryClient,
  id: string
): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [FileQueryKeys.FIND_ONE, id] });

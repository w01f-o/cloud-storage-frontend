import { fetchQueryOptionsFactory } from '@/_shared/lib/query';
import { getFolderById } from '../../api/requests';
import { Folder, FolderQueryKeys } from '../../model';

export const getFolderQueryOptions = fetchQueryOptionsFactory<
  Folder,
  { id: Folder['id'] }
>({
  queryKey: ({ id }) => [FolderQueryKeys.FIND_ONE, id],
  queryFn: ({ id }, { signal }) => getFolderById(id, { signal }),
});

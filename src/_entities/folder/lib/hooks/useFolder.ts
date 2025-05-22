import { suspenseQueryHookFactory } from '@/_shared/lib';
import { getFolderById } from '../../api/requests';
import { FolderQueryKeys } from '../../model/enums/query-keys.enum';
import { Folder } from '../../model/types/folder.type';

export const useFolder = suspenseQueryHookFactory<Folder, { id: Folder['id'] }>(
  {
    queryKey: ({ id }) => [FolderQueryKeys.FIND_ONE, id],
    queryFn: ({ id }, { signal }) => getFolderById(id, { signal }),
  }
);

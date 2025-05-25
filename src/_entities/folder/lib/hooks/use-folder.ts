import { suspenseQueryHookFactory } from '@/_shared/lib';
import { getFolderById } from '../../api/requests';
import { FolderQueryKeys } from '../../model/enums/query-keys.enum';
import { Folder } from '../../model/types/folder.type';

interface UseFolderParams {
  id: Folder['id'];
}

export const useFolder = suspenseQueryHookFactory<Folder, UseFolderParams>({
  queryKey: ({ id }) => [FolderQueryKeys.FIND_ONE, id],
  queryFn: ({ id }, { signal }) => getFolderById(id, { signal }),
});

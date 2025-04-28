import { queryHookFactory } from '@/_shared/lib';
import { getFolderById } from '../../api/requests';
import { FolderQueryKeys } from '../../model/enums/query-keys.enum';
import { Folder } from '../../model/types/folder.type';

export const useFolder = queryHookFactory<Folder, { id: string }>({
  queryKey: ({ id }) => [FolderQueryKeys.FIND_ONE, id],
  queryFn: ({ id }, { signal }) => getFolderById(id, { signal }),
});

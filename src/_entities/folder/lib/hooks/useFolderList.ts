import { suspenseQueryHookFactory } from '@/_shared/lib';
import { PaginatedResult, PaginationOptions } from '@/_shared/model';
import { getFolders } from '../../api/requests';
import { FolderQueryKeys } from '../../model/enums/query-keys.enum';
import { Folder } from '../../model/types/folder.type';

export const useFolderList = suspenseQueryHookFactory<
  PaginatedResult<Folder>,
  Partial<PaginationOptions<Folder>>
>({
  queryKey: pagination => [FolderQueryKeys.LIST, pagination],
  queryFn: (pagination, { signal }) => getFolders(pagination, { signal }),
});

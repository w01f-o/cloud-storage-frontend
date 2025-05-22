import { Folder } from '@/_entities/folder';
import { suspenseInfiniteQueryHookFactory } from '@/_shared/lib';
import { PaginatedResult, PaginationOptions } from '@/_shared/model';
import { getFilesByFolder } from '../../api/requests';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File } from '../../model/types';

export const useInfiniteFolderFiles = suspenseInfiniteQueryHookFactory<
  PaginatedResult<File>,
  Partial<PaginationOptions<File>> & { folderId: Folder['id'] }
>({
  queryKey: ({ folderId, ...pagination }) => [
    FileQueryKeys.INFINITE_FOLDER_LIST,
    folderId,
    pagination,
  ],
  queryFn: ({ folderId, ...pagination }, { signal }) =>
    getFilesByFolder(folderId, pagination, { signal }),
  getNextPageParam: lastPage => lastPage.meta.next,
  getPreviousPageParam: firstPage => firstPage.meta.prev,
  initialPageParam: 1,
});

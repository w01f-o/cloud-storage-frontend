import { Folder } from '@/_entities/folder';
import { suspenseInfiniteQueryHookFactory } from '@/_shared/lib/query';
import { PaginatedResult, PaginationOptions } from '@/_shared/model';
import { getFilesByFolder } from '../../api/requests';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File } from '../../model/types/file.type';

interface UseInfiniteFolderFilesParams
  extends Partial<PaginationOptions<File>> {
  folderId: Folder['id'];
}

export const useInfiniteFolderFiles = suspenseInfiniteQueryHookFactory<
  PaginatedResult<File>,
  UseInfiniteFolderFilesParams
>({
  queryKey: ({ folderId, ...pagination }) => [
    FileQueryKeys.INFINITE_FOLDER_LIST,
    folderId,
    pagination,
  ],
  queryFn: ({ folderId, ...pagination }, { signal, pageParam }) =>
    getFilesByFolder(folderId, { ...pagination, page: pageParam }, { signal }),
  getNextPageParam: lastPage => lastPage.meta.next,
  getPreviousPageParam: firstPage => firstPage.meta.prev,
  initialPageParam: 1,
});

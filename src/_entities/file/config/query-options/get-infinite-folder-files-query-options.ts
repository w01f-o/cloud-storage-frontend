import { fetchInfiniteQueryOptionsFactory } from '@/_shared/lib/query';
import { PaginatedResult } from '@/_shared/model';
import { PaginationOptions } from '@/_shared/model/types/pagination.type';
import { getFilesByFolder } from '../../api/requests';
import { File } from '../../model';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';

interface GetInfiniteFolderFilesQueryOptions
  extends Partial<PaginationOptions<File>> {
  folderId: File['id'];
}

export const getInfiniteFolderFilesQueryOptions =
  fetchInfiniteQueryOptionsFactory<
    PaginatedResult<File>,
    GetInfiniteFolderFilesQueryOptions
  >({
    queryKey: ({ folderId, ...pagination }) => [
      FileQueryKeys.INFINITE_FOLDER_LIST,
      folderId,
      pagination,
    ],
    queryFn: ({ folderId, ...pagination }, { signal }) =>
      getFilesByFolder(folderId, pagination, { signal }),
    getNextPageParam: lastPage => lastPage.meta.next,
    initialPageParam: 1,
  });

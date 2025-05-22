import { fetchInfiniteQueryOptionsFactory } from '@/_shared/lib/query';
import { PaginatedResult } from '@/_shared/model';
import { PaginationOptions } from '@/_shared/model/types/pagination.type';
import { getFilesByFolder } from '../../api/requests';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File } from '../../model/types';

export const getInfiniteFolderFilesQueryOptions =
  fetchInfiniteQueryOptionsFactory<
    PaginatedResult<File>,
    Partial<PaginationOptions<File>> & { folderId: File['id'] }
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

import { fetchInfiniteQueryOptionsFactory } from '@/_shared/lib/query';
import { PaginatedResult } from '@/_shared/model';
import { InfiniteSearchPaginationOptions } from '@/_shared/model/types/pagination.type';
import { getFolders } from '../../api/requests';
import { Folder, FolderQueryKeys } from '../../model';

export const getInfiniteFolderListQueryOptions =
  fetchInfiniteQueryOptionsFactory<
    PaginatedResult<Folder>,
    Partial<InfiniteSearchPaginationOptions<Folder>>
  >({
    queryKey: [FolderQueryKeys.INFINITE],
    queryFn: (pagination, { signal, pageParam }) =>
      getFolders({ ...pagination, page: pageParam }, { signal }),
    getNextPageParam: lastPage => lastPage.meta.next,
    initialPageParam: 1,
  });

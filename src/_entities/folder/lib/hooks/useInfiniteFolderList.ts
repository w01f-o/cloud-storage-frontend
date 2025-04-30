import { suspenseInfiniteQueryHookFactory } from '@/_shared/lib';
import { InfinitePaginationOptions, PaginatedResult } from '@/_shared/model';
import { getFolders } from '../../api/requests';
import { FolderQueryKeys } from '../../model/enums/query-keys.enum';
import { Folder } from '../../model/types/folder.type';

export const useInfiniteFolderList = suspenseInfiniteQueryHookFactory<
  PaginatedResult<Folder>,
  Partial<InfinitePaginationOptions<Folder>>
>({
  queryKey: [FolderQueryKeys.INFINITE],
  queryFn: (pagination, { signal, pageParam }) =>
    getFolders({ ...pagination, page: pageParam }, { signal }),
  getNextPageParam: lastPage => lastPage.meta.next,
  getPreviousPageParam: firstPage => firstPage.meta.prev,
  initialPageParam: 1,
});

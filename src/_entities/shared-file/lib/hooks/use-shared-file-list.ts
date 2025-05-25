import { suspenseQueryHookFactory } from '@/_shared/lib/query';
import { PaginatedResult, PaginationOptions } from '@/_shared/model';
import { getSharedFiles } from '../../api/requests';
import { SharedFileQueryKeys } from '../../model/enums/query-keys.enum';
import { SharedFile } from '../../model/types/shared-file.type';

export const useSharedFileList = suspenseQueryHookFactory<
  PaginatedResult<SharedFile>,
  Partial<PaginationOptions<SharedFile>>
>({
  queryKey: pagination => [SharedFileQueryKeys.LIST, pagination],
  queryFn: (pagination, { signal }) => getSharedFiles(pagination, { signal }),
});

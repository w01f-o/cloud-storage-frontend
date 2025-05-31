import { suspenseQueryHookFactory } from '@/_shared/lib/query';
import { PaginatedResult, PaginationOptions } from '@/_shared/model';
import { getFiles } from '../../api/requests';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File } from '../../model/types/file.type';

export const useFileList = suspenseQueryHookFactory<
  PaginatedResult<File>,
  Partial<PaginationOptions<File>>
>({
  queryKey: pagination => [FileQueryKeys.LIST, pagination],
  queryFn: (pagination, { signal }) => getFiles(pagination, { signal }),
});

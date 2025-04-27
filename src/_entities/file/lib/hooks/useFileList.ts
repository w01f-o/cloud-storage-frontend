import { queryHookFactory } from '@/_shared/lib';
import { PaginatedResult, PaginationOptions } from '@/_shared/model';
import { getFiles } from '../../api/requests';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File } from '../../model/types/file.type';

export const useFileList = queryHookFactory<
  PaginatedResult<File>,
  Partial<PaginationOptions<File>>
>({
  queryKey: ({ ...paginationOptions }) => [
    FileQueryKeys.LIST,
    paginationOptions,
  ],
  queryFn: ({ ...paginationOptions }, { signal }) =>
    getFiles(paginationOptions, { signal }),
});

import { suspenseQueryHookFactory } from '@/_shared/lib';
import { getFileById } from '../../api/requests';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File } from '../../model/types/file.type';

interface UseFileParams {
  id: File['id'];
}

export const useFile = suspenseQueryHookFactory<File, UseFileParams>({
  queryKey: ({ id }) => [FileQueryKeys.FIND_ONE, id],
  queryFn: ({ id }, { signal }) => getFileById(id, { signal }),
});

import { suspenseQueryHookFactory } from '@/_shared/lib';
import { getSharedFileById } from '../../api/requests';
import { SharedFileQueryKeys } from '../../model/enums/query-keys.enum';
import { SharedFile } from '../../model/types/shared-file.type';

export const useSharedFile = suspenseQueryHookFactory<
  SharedFile | null,
  { id: SharedFile['file']['id'] }
>({
  queryKey: ({ id }) => [SharedFileQueryKeys.FIND_ONE, id],
  queryFn: ({ id }, { signal }) => getSharedFileById(id, { signal }),
});

import { fetchQueryOptionsFactory } from '@/_shared/lib/query';
import { getSharedFileById } from '../../api/requests';
import { SharedFileQueryKeys } from '../../model/enums/query-keys.enum';
import { SharedFile } from '../../model/types/shared-file.type';

export const getSharedFileQueryOptions = fetchQueryOptionsFactory<
  SharedFile | null,
  { id: SharedFile['id'] }
>({
  queryKey: ({ id }) => [SharedFileQueryKeys.FIND_ONE, id],
  queryFn: ({ id }) => getSharedFileById(id),
});

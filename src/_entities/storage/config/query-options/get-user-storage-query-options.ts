import { fetchQueryOptionsFactory } from '@/_shared/lib/query';
import { getUserStorage } from '../../api/requests';
import { StorageQueryKeys } from '../../model/enums/storage-query-keys.enum';
import { UserStorage } from '../../model/types/storage.type';

export const getUserStorageQueryOptions = fetchQueryOptionsFactory<UserStorage>(
  {
    queryKey: [StorageQueryKeys.USER],
    queryFn: getUserStorage,
  }
);

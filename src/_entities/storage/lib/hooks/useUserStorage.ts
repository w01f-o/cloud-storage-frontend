import { suspenseQueryHookFactory } from '@/_shared/lib';
import { getUserStorage } from '../../api/requests';
import { StorageQueryKeys } from '../../model/enums/storage-query-keys.enum';
import { UserStorage } from '../../model/types/storage.type';

export const useUserStorage = suspenseQueryHookFactory<UserStorage>({
  queryKey: [StorageQueryKeys.USER],
  queryFn: getUserStorage,
});

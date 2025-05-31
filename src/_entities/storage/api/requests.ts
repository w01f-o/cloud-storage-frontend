import { authApiClient } from '@/_shared/lib';
import { UserStorage } from '../model/types/storage.type';

const ENDPOINT: string = '/storage';

const deserializeStorage = ({
  files,
  space: { free, total, used },
}: UserStorage): UserStorage => ({
  space: {
    free: BigInt(free),
    total: BigInt(total),
    used: BigInt(used),
  },
  files: files.map(file => ({ ...file, size: BigInt(file.size) })),
});

export const getUserStorage = async (): Promise<UserStorage> => {
  const { data } = await authApiClient.get<UserStorage>(ENDPOINT);

  return deserializeStorage(data);
};

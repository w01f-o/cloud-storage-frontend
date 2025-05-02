import { File } from '@/_entities/file';

type StorageFile = Pick<File, 'mimeType' | 'resolvedType' | 'size'>;
type UserSpace = {
  used: bigint;
  free: bigint;
  total: bigint;
};

export interface UserStorage {
  files: StorageFile[];
  space: UserSpace;
}

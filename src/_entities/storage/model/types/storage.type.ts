import { File } from '@/_entities/file';

export type StorageFile = Pick<File, 'mimeType' | 'resolvedType' | 'size'>;
export type UserSpace = {
  used: bigint;
  free: bigint;
  total: bigint;
};

export interface UserStorage {
  files: StorageFile[];
  space: UserSpace;
}

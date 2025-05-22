import { apiClient, authApiClient, RequestOptions } from '@/_shared/lib';
import { PaginatedResult, PaginationOptions } from '@/_shared/model';
import { SharedFile } from '../model/types/shared-file.type';

const ENDPOINT: string = '/shared_files';

const deserializeSharedFile = (file: SharedFile): SharedFile => ({
  ...file,
  file: {
    ...file.file,
    createdAt: new Date(file.file.createdAt),
    size: BigInt(file.file.size),
  },
});

export const getSharedFiles = async (
  params?: Partial<PaginationOptions<SharedFile>>,
  options?: RequestOptions
): Promise<PaginatedResult<SharedFile>> => {
  const { data } = await authApiClient.get<PaginatedResult<SharedFile>>(
    ENDPOINT,
    {
      signal: options?.signal,
      params,
    }
  );

  return {
    ...data,
    list: data.list.map(deserializeSharedFile),
  };
};

export const getSharedFileById = async (
  id: string,
  options?: RequestOptions
): Promise<SharedFile | null> => {
  const { data } = await apiClient.get<SharedFile>(`${ENDPOINT}/${id}`, {
    signal: options?.signal,
  });

  if (!data) return null;

  return deserializeSharedFile(data);
};

export const shareFile = async (
  fileId: string,
  type: 'share' | 'unshare'
): Promise<SharedFile> => {
  const { data } = await authApiClient<SharedFile>(`${ENDPOINT}/${fileId}`, {
    method: type === 'share' ? 'POST' : 'DELETE',
  });

  return deserializeSharedFile(data);
};

export const getDownloadSharedFileLink = (id: string): string => {
  return `${authApiClient.defaults.baseURL!}${ENDPOINT}/download/${id}`;
};

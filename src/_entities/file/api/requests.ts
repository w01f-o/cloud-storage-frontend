import { authApiClient, RequestOptions } from '@/_shared/lib';
import { PaginatedResult, PaginationOptions } from '@/_shared/model';
import { File as FileEntity } from '../model/types/file.type';
import { UpdateFileDto } from '../model/types/update-file.dto';

const ENDPOINT: string = '/files';

const deserializeFile = (file: FileEntity): FileEntity => ({
  ...file,
  createdAt: new Date(file.createdAt),
  size: BigInt(file.size),
});

export const getFiles = async (
  params?: Partial<PaginationOptions<FileEntity>>,
  options?: RequestOptions
): Promise<PaginatedResult<FileEntity>> => {
  const { data } = await authApiClient.get<PaginatedResult<FileEntity>>(
    ENDPOINT,
    {
      signal: options?.signal,
      params,
    }
  );

  return {
    list: data.list.map(deserializeFile),
    meta: data.meta,
  };
};

export const getFileById = async (
  id: string,
  options?: RequestOptions
): Promise<FileEntity> => {
  const { data } = await authApiClient.get<FileEntity>(`${ENDPOINT}/${id}`, {
    signal: options?.signal,
  });

  return deserializeFile(data);
};

export const uploadFile = async (
  file: File,
  options?: RequestOptions & { onProgress?: (progress: number) => void }
): Promise<FileEntity> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await authApiClient.post<FileEntity>(ENDPOINT, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    signal: options?.signal,
    onUploadProgress: progress => {
      if (progress.total) {
        const percent = Math.round((progress.loaded * 100) / progress.total);

        options?.onProgress?.(percent);
      }
    },
  });

  return deserializeFile(data);
};

export const updateFile = async (
  id: string,
  dto: Partial<UpdateFileDto>
): Promise<FileEntity> => {
  const { data } = await authApiClient.patch<FileEntity>(
    `${ENDPOINT}/${id}`,
    dto
  );

  return deserializeFile(data);
};

export const deleteFile = async (id: string): Promise<FileEntity> => {
  const { data } = await authApiClient.delete<FileEntity>(`${ENDPOINT}/${id}`);

  return deserializeFile(data);
};

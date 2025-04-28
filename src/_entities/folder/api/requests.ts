import { authApiClient, RequestOptions } from '@/_shared/lib';
import { PaginatedResult, PaginationOptions } from '@/_shared/model';
import {
  CreateFolderDto,
  Folder,
  UpdateFolderDto,
} from '../model/types/folder.type';

const ENDPOINT: string = '/folders';

const deserializeFolder = (folder: Folder): Folder => ({
  ...folder,
  createdAt: new Date(folder.createdAt),
  updatedAt: new Date(folder.updatedAt),
  size: BigInt(folder.size),
});

export const getFolders = async (
  pagination?: Partial<PaginationOptions<Folder>>,
  options?: RequestOptions
): Promise<PaginatedResult<Folder>> => {
  const { data } = await authApiClient.get<PaginatedResult<Folder>>(ENDPOINT, {
    signal: options?.signal,
    params: pagination,
  });

  return {
    ...data,
    list: data.list.map(deserializeFolder),
  };
};

export const getFolderById = async (
  id: string,
  options: RequestOptions
): Promise<Folder> => {
  const { data } = await authApiClient.get<Folder>(`${ENDPOINT}/${id}`, {
    signal: options?.signal,
  });

  return deserializeFolder(data);
};

export const createFolder = async (dto: CreateFolderDto): Promise<Folder> => {
  const { data } = await authApiClient.post<Folder>(ENDPOINT, dto);

  return deserializeFolder(data);
};

export const updateFolder = async (
  id: string,
  dto: UpdateFolderDto
): Promise<Folder> => {
  const { data } = await authApiClient.patch(`${ENDPOINT}/${id}`, dto);

  return deserializeFolder(data);
};

export const deleteFolder = async (id: string): Promise<Folder> => {
  const { data } = await authApiClient.delete<Folder>(`${ENDPOINT}/${id}`);

  return deserializeFolder(data);
};

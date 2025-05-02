import { authApiClient } from '@/_shared/lib';
import { UpdateUserDto, User } from '../model/types/user.type';

const ENDPOINT: string = '/user';

export const updateUser = async (dto: UpdateUserDto) => {
  const formData = new FormData();

  Object.entries(dto).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const { data } = await authApiClient.patch<User>(ENDPOINT, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

export const deleteUser = async () => {
  const { data } = await authApiClient.delete<User>(ENDPOINT);

  return data;
};

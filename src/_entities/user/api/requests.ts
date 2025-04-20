import { apiClient } from '@/_shared/lib';
import { User } from '../model';
import { UpdateUserDto } from '../model/types/user.type';

const ENDPOINT = '/users';

const updateUser = async (dto: UpdateUserDto) => {
  const { data } = await apiClient.patch<User>(ENDPOINT, dto);

  return data;
};

export { updateUser };

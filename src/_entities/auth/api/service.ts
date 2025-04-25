import { User } from '@/_entities/user';
import { apiClient, authApiClient } from '@/_shared/lib';
import { RequestOptions } from 'https';
import { useTokenStore } from '../lib';
import { LoginDto, RegisterDto } from '../model';
import { AuthResponse } from '../model/types';

const ENDPOINT: string = '/auth';

const authorize = async (
  type: 'login' | 'register',
  dto: LoginDto | RegisterDto
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    `${ENDPOINT}/${type}`,
    dto
  );

  useTokenStore.setState({
    accessToken: data.accessToken,
  });

  return data;
};

const logout = async (): Promise<void> => {
  await apiClient.post<AuthResponse>(`${ENDPOINT}/logout`);

  useTokenStore.setState({ accessToken: null });
};

const refreshTokens = async (): Promise<void> => {
  const { data } = await apiClient.post<AuthResponse>(`${ENDPOINT}/refresh`);

  useTokenStore.setState({
    accessToken: data.accessToken,
  });
};

const getCurrentUser = async ({ signal }: RequestOptions): Promise<User> => {
  const { data } = await authApiClient.get<User>('user', { signal });

  return data;
};

export { authorize, getCurrentUser, logout, refreshTokens };

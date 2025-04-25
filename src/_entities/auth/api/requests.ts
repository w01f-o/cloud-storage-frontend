import { User } from '@/_entities/user';
import { apiClient, authApiClient } from '@/_shared/lib';
import { browserQueryClient } from '@/app/providers/TanstackQueryProvider';
import { isServer } from '@tanstack/react-query';
import { RequestOptions } from 'https';
import { getRefreshToken } from '../lib/get-refresh-token';
import { AuthQueryKeys, LoginDto, RegisterDto } from '../model';
import { AuthResponse } from '../model/types';

const ENDPOINT: string = '/auth';

export const login = async (dto: LoginDto): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(`${ENDPOINT}/login`, dto);

  return data;
};

export const register = async (dto: RegisterDto): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    `${ENDPOINT}/register`,
    dto
  );

  return data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post<AuthResponse>(`${ENDPOINT}/logout`);

  browserQueryClient?.setQueryData([AuthQueryKeys.CURRENT_SESSION], null);
  browserQueryClient?.resetQueries({
    predicate: query =>
      Array.isArray(query.queryKey) &&
      query.queryKey[0] !== AuthQueryKeys.CURRENT_SESSION,
  });
};

export const refreshTokens = async (): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    `${ENDPOINT}/refresh`,
    isServer ? { refreshToken: await getRefreshToken() } : null
  );

  console.log('client');

  return data;
};

export const getCurrentUser = async ({
  signal,
}: RequestOptions): Promise<User | null> => {
  try {
    const { data } = await authApiClient.get<User>('user', { signal });

    return data;
  } catch {
    return null;
  }
};

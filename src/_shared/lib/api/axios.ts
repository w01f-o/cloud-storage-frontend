import {
  AuthErrors,
  logout,
  refreshTokens,
  useTokenStore,
} from '@/_entities/auth';
import axios, {
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { catchApiError } from './catch-api-error';
import { HttpStatus } from './enums/http-status.enum';

let refreshPromise: Promise<void> | null = null;

const baseConfig: CreateAxiosDefaults = {
  baseURL: process.env?.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const apiClient = axios.create(baseConfig);
const authApiClient = axios.create(baseConfig);

authApiClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${useTokenStore.getState().accessToken}`;

  return config;
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

authApiClient.interceptors.response.use(
  response => response,
  async error => {
    if (!isAxiosError(error)) {
      throw error;
    }

    const originalRequest = error.config as RetryableRequestConfig;
    const errorData = catchApiError<AuthErrors>(error);

    const isTokensError =
      errorData.statusCode === HttpStatus.UNAUTHORIZED &&
      (errorData.message === AuthErrors.INVALID_ACCESS_TOKEN ||
        errorData.message === AuthErrors.INVALID_REFRESH_TOKEN);

    if (!isTokensError || !originalRequest || originalRequest._retry) {
      throw error;
    }

    originalRequest._retry = true;

    try {
      if (refreshPromise) {
        await refreshPromise;
      } else {
        refreshPromise = refreshTokens();
        await refreshPromise;
        refreshPromise = null;
      }
    } catch {
      refreshPromise = null;

      return await logout();
    }

    if (originalRequest.url !== 'users') {
      return authApiClient(originalRequest);
    }
  }
);

export { apiClient, authApiClient };

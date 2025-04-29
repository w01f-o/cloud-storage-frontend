import {
  AuthErrors,
  AuthResponse,
  getAccessToken,
  logout,
  refreshTokens,
} from '@/_entities/auth';
import { navigate } from '@/_shared/lib';
import { RoutePaths } from '@/_shared/router';
import { browserQueryClient } from '@/app/providers/TanstackQueryProvider';
import { isServer } from '@tanstack/react-query';
import axios, {
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { HttpStatus } from './enums/http-status.enum';
import { catchApiError } from './helpers';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<AuthResponse> | null = null;

const baseConfig: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const apiClient = axios.create(baseConfig);
const authApiClient = axios.create(baseConfig);

authApiClient.interceptors.request.use(
  async (config: RetryableRequestConfig) => {
    if (isServer && !config._retry) {
      const accessToken = await getAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }
);

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

        if (isServer) {
          originalRequest.headers.Authorization = `Bearer ${(await refreshPromise).accessToken}`;
        }

        refreshPromise = null;
      }
    } catch {
      refreshPromise = null;

      if (!isServer) {
        await logout();

        browserQueryClient?.resetQueries();

        await navigate(RoutePaths.WELCOME);
      }

      return;
    }

    const response = await authApiClient(originalRequest);

    return response;
  }
);

export { apiClient, authApiClient };

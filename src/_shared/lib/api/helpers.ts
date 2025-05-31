import { isAxiosError } from 'axios';
import { ApiError } from './types';

export const catchApiError = <T extends string>(
  error: unknown
): ApiError<T> => {
  if (isAxiosError(error)) {
    return error.response?.data;
  }

  throw error;
};

export const getApiStaticUrl = (file: string) =>
  `${process.env.NEXT_PUBLIC_API_STATIC_URL}/${file}`;

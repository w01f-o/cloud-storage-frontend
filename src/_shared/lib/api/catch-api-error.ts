import { isAxiosError } from 'axios';
import { ApiError } from './types';

const catchApiError = <T extends string>(error: unknown): ApiError<T> => {
  if (isAxiosError(error)) {
    return error.response?.data;
  }

  throw error;
};

export { catchApiError };

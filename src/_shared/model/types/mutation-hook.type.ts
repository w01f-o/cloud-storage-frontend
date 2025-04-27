import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type MutationHookOptions<
  TData,
  TVariables = AxiosError,
  TError = Error,
> = Omit<
  UseMutationOptions<TData, TError, TVariables, unknown>,
  'mutationFn' | 'mutationKey'
>;

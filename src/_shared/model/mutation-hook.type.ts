import { UseMutationOptions } from '@tanstack/react-query';

export type MutationHookOptions<
  TData,
  TError = Error,
  TVariables = unknown,
> = Omit<
  UseMutationOptions<TData, TError, TVariables, unknown>,
  'mutationFn' | 'mutationKey'
>;

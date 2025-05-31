import {
  FetchQueryOptions,
  QueryFunctionContext,
  QueryKey,
} from '@tanstack/react-query';

export const fetchQueryOptionsFactory = <
  TQueryFnData = unknown,
  TRequestParams = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryKey,
  queryFn,
}: {
  queryKey: ((requestParams: TRequestParams) => TQueryKey) | TQueryKey;
  queryFn: (
    requestParams: TRequestParams,
    context: QueryFunctionContext<TQueryKey>
  ) => Promise<TQueryFnData> | TQueryFnData;
}) =>
  function <TData = TQueryFnData>(
    requestParams?: TRequestParams,
    options?: Omit<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn'
    >
  ): FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
    const resolvedParams = requestParams ?? ({} as TRequestParams);
    const resolvedQueryKey =
      typeof queryKey === 'function' ? queryKey(resolvedParams) : queryKey;

    return {
      queryKey: resolvedQueryKey,
      queryFn: context => queryFn(resolvedParams, context),
      ...options,
    };
  };

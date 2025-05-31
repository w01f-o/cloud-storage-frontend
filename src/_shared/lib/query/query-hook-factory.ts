import {
  QueryFunctionContext,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from '@tanstack/react-query';

export const queryHookFactory = <
  TQueryFnData,
  TRequestParams = unknown,
  TError = unknown,
  TData = TQueryFnData,
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
  function <SelectType = TData>(
    requestParams?: TRequestParams,
    options?: Omit<
      UseQueryOptions<TQueryFnData, TError, SelectType, TQueryKey>,
      'queryKey' | 'queryFn'
    >
  ) {
    const resolvedParams = requestParams ?? ({} as TRequestParams);
    const resolvedQueryKey =
      typeof queryKey === 'function' ? queryKey(resolvedParams) : queryKey;

    return useQuery({
      queryKey: resolvedQueryKey,
      queryFn: context => queryFn(resolvedParams, context),
      ...options,
    });
  };

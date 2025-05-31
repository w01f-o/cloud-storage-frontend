import {
  QueryFunctionContext,
  QueryKey,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

export const suspenseQueryHookFactory = <
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
      UseSuspenseQueryOptions<TQueryFnData, TError, SelectType, TQueryKey>,
      'queryKey' | 'queryFn'
    >
  ) {
    const resolvedParams = requestParams ?? ({} as TRequestParams);
    const resolvedQueryKey =
      typeof queryKey === 'function' ? queryKey(resolvedParams) : queryKey;

    return useSuspenseQuery({
      queryKey: resolvedQueryKey,
      queryFn: context => queryFn(resolvedParams, context),
      ...options,
    });
  };

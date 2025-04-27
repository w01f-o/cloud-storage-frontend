import {
  FetchInfiniteQueryOptions,
  GetNextPageParamFunction,
  QueryFunctionContext,
  QueryKey,
} from '@tanstack/react-query';

export const fetchInfiniteQueryOptionsFactory = <
  TQueryFnData,
  TRequestParams = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = number,
>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam,
}: {
  queryKey: ((requestParams: TRequestParams) => TQueryKey) | TQueryKey;
  queryFn: (
    requestParams: TRequestParams,
    context: QueryFunctionContext<TQueryKey, TPageParam>
  ) => Promise<TQueryFnData> | TQueryFnData;
  getNextPageParam: GetNextPageParamFunction<TPageParam, TQueryFnData>;
  initialPageParam: TPageParam;
}) =>
  function <TData = TQueryFnData>(
    requestParams?: TRequestParams,
    options?: Omit<
      FetchInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryKey,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
    >
  ): FetchInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  > {
    const resolvedParams = requestParams ?? ({} as TRequestParams);
    const resolvedQueryKey =
      typeof queryKey === 'function' ? queryKey(resolvedParams) : queryKey;

    return {
      queryKey: resolvedQueryKey,
      queryFn: context => queryFn(resolvedParams, context),
      getNextPageParam,
      initialPageParam,
      ...options,
    };
  };

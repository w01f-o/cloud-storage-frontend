import {
  GetNextPageParamFunction,
  GetPreviousPageParamFunction,
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

export const infiniteQueryHookFactory = <
  TQueryFnData,
  TRequestParams = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = number,
  TData = InfiniteData<TQueryFnData, TPageParam>,
>({
  queryKey,
  queryFn,
  getNextPageParam,
  getPreviousPageParam,
  initialPageParam,
}: {
  queryKey: ((requestParams: TRequestParams) => TQueryKey) | TQueryKey;
  queryFn: (
    requestParams: TRequestParams,
    context: QueryFunctionContext<TQueryKey, TPageParam>
  ) => Promise<TQueryFnData> | TQueryFnData;
  getNextPageParam: GetNextPageParamFunction<TPageParam, TQueryFnData>;
  initialPageParam: TPageParam;
  getPreviousPageParam: GetPreviousPageParamFunction<TPageParam, TQueryFnData>;
}) =>
  function <SelectType = TData>(
    requestParams?: TRequestParams,
    options?: Omit<
      UseInfiniteQueryOptions<
        TQueryFnData,
        TError,
        SelectType,
        TQueryFnData,
        TQueryKey,
        TPageParam
      >,
      | 'queryKey'
      | 'queryFn'
      | 'getNextPageParam'
      | 'getPreviousPageParam'
      | 'initialPageParam'
    >
  ) {
    const resolvedParams = requestParams ?? ({} as TRequestParams);
    const resolvedQueryKey =
      typeof queryKey === 'function' ? queryKey(resolvedParams) : queryKey;

    return useInfiniteQuery({
      queryKey: resolvedQueryKey,
      queryFn: context => queryFn(resolvedParams, context),
      getNextPageParam,
      getPreviousPageParam,
      initialPageParam,
      ...options,
    });
  };

export interface PaginatedResult<T> {
  list: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export interface PaginationOptions<T> {
  page: number;
  perPage: number;
  sortBy: keyof T;
  sortOrder: 'asc' | 'desc';
}

export interface SearchPaginationOptions<T> extends PaginationOptions<T> {
  search: string;
}

export type InfinitePaginationOptions<T> = Omit<PaginationOptions<T>, 'page'>;
export type InfiniteSearchPaginationOptions<T> =
  InfinitePaginationOptions<T> & {
    search: string | null;
  };

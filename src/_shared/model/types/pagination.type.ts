interface PaginatedResult<T> {
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

interface PaginationOptions<T> {
  page: number;
  perPage: number;
  // TODO: add types for sortBy
  sortBy: keyof T;
  sortOrder: 'asc' | 'desc';
}

type InfinitePaginationOptions<T> = Omit<PaginationOptions<T>, 'page'>;

export type { InfinitePaginationOptions, PaginatedResult, PaginationOptions };

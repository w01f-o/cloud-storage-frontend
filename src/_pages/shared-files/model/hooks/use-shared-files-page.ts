import { SharedFile, useSharedFileList } from '@/_entities/shared-file';
import { usePathname, useRouter } from '@/_shared/i18n';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const PAGE_QUERY_KEY: string = 'page';

interface UseSharedFilesPageParams {
  perPage: number;
  maxVisibleLinks: number;
}

interface UseSharedFilesPageReturn {
  paginationIsVisible: boolean;
  isHasNext: boolean;
  isHasPrev: boolean;
  prevHref: { pathname: string; query: { [PAGE_QUERY_KEY]: number | null } };
  nextHref: { pathname: string; query: { [PAGE_QUERY_KEY]: number | null } };
  list: SharedFile[];
  isEmpty: boolean;
  links: Array<{
    key: number;
    isActive: boolean;
    href: { pathname: string; query: { [PAGE_QUERY_KEY]: number } };
  }>;
}

export const useSharedFilesPage = ({
  maxVisibleLinks = 5,
  perPage = 9,
}: Partial<UseSharedFilesPageParams> = {}): UseSharedFilesPageReturn => {
  const page = Number(useSearchParams().get(PAGE_QUERY_KEY) ?? 1);
  const router = useRouter();
  const {
    data: { meta, list },
  } = useSharedFileList({ page, perPage });
  const pathname = usePathname();
  const paginationIsVisible = !!meta.next || !!meta.prev;

  useEffect(() => {
    if (paginationIsVisible && meta.lastPage < page) {
      console.log(meta);

      router.push({ pathname, query: { [PAGE_QUERY_KEY]: meta.lastPage } });
    }
  }, [meta, page, paginationIsVisible, pathname, router]);

  const isHasNext = !!meta.next;
  const isHasPrev = !!meta.prev;

  const prevHref = { pathname, query: { [PAGE_QUERY_KEY]: meta.prev } };
  const nextHref = { pathname, query: { [PAGE_QUERY_KEY]: meta.next } };

  const isEmpty = !meta.total;

  const half = Math.floor(maxVisibleLinks / 2);

  let start = Math.max(1, page - half);
  let end = start + maxVisibleLinks - 1;

  if (end > meta.lastPage) {
    end = meta.lastPage;
    start = Math.max(1, end - maxVisibleLinks + 1);
  }

  const links = Array.from({ length: end - start + 1 }).map((_, i) => {
    const pageNumber = start + i;

    return {
      key: pageNumber,
      href: { pathname, query: { page: pageNumber } },
      isActive: pageNumber === page,
    };
  });

  return {
    paginationIsVisible,
    isHasNext,
    isHasPrev,
    prevHref,
    nextHref,
    list,
    isEmpty,
    links,
  };
};

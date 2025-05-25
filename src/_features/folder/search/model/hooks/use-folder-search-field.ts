import { usePathname, useRouter } from '@/_shared/i18n';
import debounce from 'lodash/debounce';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useTransition } from 'react';
import { FOLDERS_SEARCH_QUERY_KEY } from '../constants';

interface UseFolderSearchFieldParams {
  setIsSearching: (isSearching: boolean) => void;
}

interface UseFolderSearchFieldReturn {
  defaultValue: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useFolderSearchField = ({
  setIsSearching,
}: UseFolderSearchFieldParams): UseFolderSearchFieldReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [routerIsPending, startTransition] = useTransition();

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        startTransition(() => {
          if (inputValue.length > 0) {
            router.push({
              pathname,
              query: { [FOLDERS_SEARCH_QUERY_KEY]: inputValue },
            });
          } else {
            router.push(pathname);
          }
        });
      }, 250),
    [pathname, router]
  );

  useEffect(() => {
    setIsSearching(routerIsPending);
  }, [routerIsPending, setIsSearching]);

  return {
    defaultValue: searchParams.get(FOLDERS_SEARCH_QUERY_KEY) ?? '',
    changeHandler: debouncedChangeHandler,
  };
};

'use client';

import { usePathname, useRouter } from '@/_shared/i18n';
import { Input } from '@/_shared/ui';
import { IconSearch } from '@tabler/icons-react';
import debounce from 'lodash/debounce';
import { useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useTransition,
} from 'react';
import { FOLDERS_SEARCH_QUERY_KEY } from '../model/constants';

interface FoldersSearchFieldProps {
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}

export const FoldersSearchField: FC<FoldersSearchFieldProps> = ({
  setIsSearching,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

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
    setIsSearching(isPending);
  }, [isPending, setIsSearching]);

  return (
    <Input
      size='sm'
      color='secondary'
      startContent={<IconSearch />}
      onChange={debouncedChangeHandler}
      defaultValue={searchParams.get(FOLDERS_SEARCH_QUERY_KEY) ?? ''}
    />
  );
};

'use client';

import { usePathname, useRouter } from '@/_shared/i18n';
import { Input } from '@/_shared/ui';
import { IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, FC } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

export const QUERY_KEY: string = 'search';

export const FoldersSearchField: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debouncedChangeHandler = useDebounceCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (inputValue.length > 0) {
        router.push({ pathname, query: { [QUERY_KEY]: inputValue } });
      } else {
        router.push(pathname);
      }
    },
    500
  );

  return (
    <Input
      size='sm'
      color='secondary'
      startContent={<IconSearch />}
      onChange={debouncedChangeHandler}
      defaultValue={searchParams.get(QUERY_KEY) ?? ''}
    />
  );
};

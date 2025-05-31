'use client';

import { Input } from '@/_shared/ui';
import { IconSearch } from '@tabler/icons-react';
import { Dispatch, FC, SetStateAction } from 'react';
import { useFolderSearchField } from '../model';

interface FoldersSearchFieldProps {
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}

export const FoldersSearchField: FC<FoldersSearchFieldProps> = ({
  setIsSearching,
}) => {
  const { changeHandler, defaultValue } = useFolderSearchField({
    setIsSearching,
  });

  return (
    <Input
      size='sm'
      color='secondary'
      startContent={<IconSearch />}
      onChange={changeHandler}
      defaultValue={defaultValue}
    />
  );
};

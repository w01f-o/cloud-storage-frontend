'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/ui';
import { Spinner } from '@/_shared/ui/spinner';
import { FC } from 'react';
import { useLocaleSwitcher } from '../model/useLocaleSwitcher';

export const LocaleSwitcher: FC = () => {
  const { changeHandler, dropdownIsOpen, isPending, locale, toggleDropdown } =
    useLocaleSwitcher();

  return (
    <>
      <Select
        value={locale}
        onValueChange={changeHandler}
        open={dropdownIsOpen}
        onOpenChange={toggleDropdown}
        disabled={isPending}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={locale} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='ru'>Ru</SelectItem>
            <SelectItem value='en'>En</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {isPending && <Spinner />}
    </>
  );
};

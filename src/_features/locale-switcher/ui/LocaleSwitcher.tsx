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
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useLocaleSwitcher } from '../model/useLocaleSwitcher';

export const LocaleSwitcher: FC = () => {
  const t = useTranslations('SettingsPage.general.locale');
  const { changeHandler, dropdownIsOpen, isPending, locale, toggleDropdown } =
    useLocaleSwitcher();

  return (
    <div className='flex items-center gap-4'>
      <div>{t('title')}</div>
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
    </div>
  );
};

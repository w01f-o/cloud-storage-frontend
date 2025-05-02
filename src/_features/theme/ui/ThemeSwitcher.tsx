'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { FC } from 'react';

export const ThemeSwitcher: FC = () => {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('SettingsPage.appearance.theme');

  return (
    <div className='flex items-center gap-4'>
      <div>{t('title')}</div>
      <Select defaultValue={theme} value={theme} onValueChange={setTheme}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={theme} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='dark'>{t('variants.dark')}</SelectItem>
            <SelectItem value='light'>{t('variants.light')}</SelectItem>
            <SelectItem value='system'>{t('variants.system')}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

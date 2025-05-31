'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/ui';
import { Messages, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { FC } from 'react';

export const ThemeSwitcher: FC = () => {
  const { setTheme, theme, themes } = useTheme();
  const t = useTranslations('SettingsPage.appearance.theme.variants');

  return (
    <Select defaultValue={theme} value={theme} onValueChange={setTheme}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={theme} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {themes.map(theme => (
            <SelectItem value={theme} key={theme}>
              {t(
                theme as keyof Messages['SettingsPage']['appearance']['theme']['variants']
              )}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

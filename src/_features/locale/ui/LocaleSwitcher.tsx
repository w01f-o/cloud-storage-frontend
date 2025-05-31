'use client';

import { routing } from '@/_shared/i18n';
import {
  IconFlag,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useLocaleSwitcher } from '../model/hooks/use-locale-switcher';

export const LocaleSwitcher: FC = () => {
  const { changeHandler, dropdownIsOpen, isPending, locale, toggleDropdown } =
    useLocaleSwitcher();
  const t = useTranslations('SettingsPage.general.locale');
  const { locales } = routing;

  return (
    <>
      <Select
        value={locale}
        onValueChange={changeHandler}
        open={dropdownIsOpen}
        onOpenChange={toggleDropdown}
        disabled={isPending}
      >
        <SelectTrigger>
          <IconFlag locale={locale} />
          <SelectValue placeholder={t(`item.${locale}`)} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {locales.map(locale => (
              <SelectItem
                value={locale}
                key={locale}
                icon={<IconFlag locale={locale} />}
              >
                {t(`item.${locale}`)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isPending && <Spinner />}
    </>
  );
};

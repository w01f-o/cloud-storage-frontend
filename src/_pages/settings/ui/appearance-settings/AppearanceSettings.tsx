'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { SettingsGroup } from '../SettingsGroup';
import { SettingsRow } from '../SettingsRow';
import { SettingsRowLoader } from '../SettingsRowLoader';

const DynamicThemeSwitcher = dynamic(
  () => import('@/_features/theme').then(module => module.ThemeSwitcher),
  { ssr: false, loading: () => <SettingsRowLoader /> }
);

export const AppearanceSettings: FC = () => {
  const t = useTranslations('SettingsPage.appearance');

  return (
    <SettingsGroup>
      <SettingsRow label={t('theme.title')}>
        <DynamicThemeSwitcher />
      </SettingsRow>
    </SettingsGroup>
  );
};

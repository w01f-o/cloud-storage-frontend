'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { SettingsRowLoader } from '../LocaleSwitcherLoader';
import { SettingsGroup } from '../SettingsGroup';
import { SettingsRow } from '../SettingsRow';

const DynamicLocaleSwitcher = dynamic(
  () => import('@/_features/locale').then(module => module.LocaleSwitcher),
  { ssr: false, loading: () => <SettingsRowLoader /> }
);

export const GeneralSettings: FC = () => {
  const t = useTranslations('SettingsPage.general');

  return (
    <SettingsGroup>
      <SettingsRow label={t('locale.title')}>
        <DynamicLocaleSwitcher />
      </SettingsRow>
    </SettingsGroup>
  );
};

'use client';

import { Button } from '@/_shared/ui';
import { PageTitle } from '@/_shared/ui/page-title/PageTitle';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { FC } from 'react';

export const SettingsPage: FC = () => {
  const t = useTranslations('SettingsPage');
  const { setTheme } = useTheme();

  return (
    <>
      <PageTitle title={t('title')} />
      <Button onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
      <Button onClick={() => setTheme('system')}>System</Button>
    </>
  );
};

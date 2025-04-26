'use client';

import { Button } from '@/_shared/ui';
import { useTheme } from 'next-themes';
import { FC } from 'react';

export const SettingsPage: FC = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <Button onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
      <Button onClick={() => setTheme('system')}>System</Button>
    </>
  );
};

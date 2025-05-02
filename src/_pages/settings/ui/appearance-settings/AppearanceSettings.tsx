'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicThemeSwitcher = dynamic(
  () => import('@/_features/theme').then(module => module.ThemeSwitcher),
  { ssr: false }
);

export const AppearanceSettings: FC = () => {
  return (
    <div className='flex w-full flex-col gap-4'>
      <DynamicThemeSwitcher />
    </div>
  );
};

'use client';

import { LocaleSwitcherLoader } from '@/_features/locale-switcher/ui/LocaleSWitcherLoader';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicLocaleSwitcher = dynamic(
  () =>
    import('@/_features/locale-switcher').then(module => module.LocaleSwitcher),
  { ssr: false, loading: () => <LocaleSwitcherLoader /> }
);

export const GeneralSettings: FC = () => {
  return (
    <div className='flex flex-col gap-4'>
      <DynamicLocaleSwitcher />
    </div>
  );
};

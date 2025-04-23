'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicNextTopLoader = dynamic(() => import('nextjs-toploader'), {
  ssr: false,
});
const DynamicToaster = dynamic(
  () => import('sonner').then(module => module.Toaster),
  { ssr: false }
);

export const ClientEffects: FC = () => {
  return (
    <>
      <DynamicNextTopLoader
        showSpinner={false}
        color='var(--color-primary)'
        height={4}
      />
      <DynamicToaster position='bottom-right' />
    </>
  );
};

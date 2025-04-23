'use client';

import { Sidebar } from '@/_widgets/sidebar';
import dynamic from 'next/dynamic';
import { FC, PropsWithChildren } from 'react';

const DynamicNextTopLoader = dynamic(() => import('nextjs-toploader'), {
  ssr: false,
});
const DynamicToaster = dynamic(
  () => import('sonner').then(module => module.Toaster),
  { ssr: false }
);

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <DynamicNextTopLoader
        showSpinner={false}
        color='var(--color-primary)'
        height={4}
      />
      <DynamicToaster position='bottom-right' />
      <Sidebar />
      <main className='bg-content h-full flex-grow rounded-4xl px-12 pt-16 pb-7 transition-colors'>
        {children}
      </main>
    </>
  );
};

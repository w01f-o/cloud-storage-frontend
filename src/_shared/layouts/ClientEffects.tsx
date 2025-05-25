'use client';

import { IconExclamationCircle, IconProgressCheck } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const DynamicNextTopLoader = dynamic(() => import('nextjs-toploader'), {
  ssr: false,
});
const DynamicToaster = dynamic(
  () => import('sonner').then(module => module.Toaster),
  { ssr: false }
);
const DynamicFileUploadStatus = dynamic(
  () =>
    import('@/_features/file/uploader/ui/status/FileUploadStatusList').then(
      module => module.FileUploadStatusList
    ),
  { ssr: false }
);

export const ClientEffects: FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <DynamicNextTopLoader
        showSpinner={false}
        color='var(--color-primary)'
        height={4}
      />
      <DynamicToaster
        position={isMobile ? 'top-center' : 'bottom-right'}
        icons={{
          success: <IconProgressCheck />,
          error: <IconExclamationCircle />,
        }}
        toastOptions={{
          className: '!text-foreground',
          classNames: {
            success: '!bg-success !border-success',
            error: '!bg-danger !border-danger',
          },
        }}
      />
      <DynamicFileUploadStatus />
    </>
  );
};

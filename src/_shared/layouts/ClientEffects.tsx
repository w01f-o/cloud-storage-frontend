'use client';

import {
  IconExclamationCircle,
  IconProgressAlert,
  IconProgressCheck,
} from '@tabler/icons-react';
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
          info: <IconProgressAlert />,
        }}
        toastOptions={{
          className: '!text-foreground !text-base !rounded-xl',
          classNames: {
            success: '!bg-success !border-success !gap-2.5',
            error: '!bg-danger !border-danger !gap-2.5',
            info: '!bg-secondary !border-secondary dark:!bg-primary dark:!border-primary !gap-2.5',
          },
        }}
      />
      <DynamicFileUploadStatus />
    </>
  );
};

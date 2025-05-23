import { useUploadFile } from '@/_entities/file';
import { Button, FadeInOut } from '@/_shared/ui';
import { IconFileUpload } from '@tabler/icons-react';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { FC, ReactNode, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

interface DropzoneFileUploaderProps {
  children: ReactNode;
  folderId: string;
  withIcon?: boolean;
  noClick?: boolean;
}

export const DropzoneFileUploader: FC<DropzoneFileUploaderProps> = ({
  children,
  folderId,
  withIcon,
}) => {
  const t = useTranslations('DropzoneFileUploader');
  const { mutate, isPending } = useUploadFile({
    onSuccess: data => {
      toast.success(t('success', { name: data.displayName }));
    },
    onError: (error, variables) => {
      if (error.code === 'ERR_CANCELED') return;

      toast.error(t('errors.server.unknown', { name: variables.file.name }));
    },
  });

  const dropAcceptHandler = (files: File[]) => {
    mutate({ file: files[0], id: nanoid(), folderId });
  };

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    onDropAccepted: dropAcceptHandler,
    noClick: true,
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPending) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPending]);

  return (
    <>
      <div {...getRootProps()} className='flex-grow'>
        {children}
        <FadeInOut isVisible={isDragActive}>
          <div className='bg-overlay/40 dark:bg-overlay/60 absolute inset-0 z-20 grid place-items-center'>
            <IconFileUpload size={120} />
          </div>
        </FadeInOut>
        <FadeInOut isVisible={!!withIcon && !isDragActive}>
          <div className='relative flex justify-center py-2'>
            <Button radius='full' isIconOnly onClick={open}>
              <IconFileUpload size={30} />
            </Button>
          </div>
        </FadeInOut>
        <input {...getInputProps()} />
      </div>
    </>
  );
};

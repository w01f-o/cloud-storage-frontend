import { Button, FadeInOut } from '@/_shared/ui';
import { IconFileUpload } from '@tabler/icons-react';
import { FC, ReactNode } from 'react';
import { useDropzoneFileUploader } from '../model/hooks/use-dropzone-file-uploader';

interface DropzoneFileUploaderProps {
  children: ReactNode;
  folderId: string;
  withIcon?: boolean;
}

export const DropzoneFileUploader: FC<DropzoneFileUploaderProps> = ({
  children,
  folderId,
  withIcon,
}) => {
  const { getInputProps, getRootProps, isDragActive, open } =
    useDropzoneFileUploader({ folderId });

  return (
    <>
      <div {...getRootProps()} className='flex flex-grow flex-col'>
        {children}
        <FadeInOut isVisible={isDragActive}>
          <div className='bg-overlay/40 dark:bg-overlay/60 absolute inset-0 z-20 grid place-items-center'>
            <IconFileUpload size={120} />
          </div>
        </FadeInOut>
        <FadeInOut isVisible={!!withIcon && !isDragActive}>
          <div className='relative flex justify-center py-6'>
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

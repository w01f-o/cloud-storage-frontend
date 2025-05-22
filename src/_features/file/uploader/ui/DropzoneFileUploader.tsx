import { useUploadFile } from '@/_entities/file';
import { Button, FadeInOut } from '@/_shared/ui';
import { IconUpload } from '@tabler/icons-react';
import { nanoid } from 'nanoid';
import { FC, ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';

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
  const { mutate } = useUploadFile();

  const dropAcceptHandler = (files: File[]) => {
    mutate({ file: files[0], id: nanoid(), folderId });
  };

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    onDropAccepted: dropAcceptHandler,
    noClick: true,
  });

  return (
    <>
      <div {...getRootProps()} className=''>
        <input {...getInputProps()} />
        {children}
        <FadeInOut isVisible={isDragActive}>
          <div className='bg-overlay/40 dark:bg-overlay/60 absolute inset-0 grid place-items-center'>
            <IconUpload size={120} />
          </div>
        </FadeInOut>
      </div>
      {withIcon && (
        <div className='flex justify-center py-2'>
          <Button radius='full' isIconOnly onClick={open}>
            <IconUpload size={30} />
          </Button>
        </div>
      )}
    </>
  );
};

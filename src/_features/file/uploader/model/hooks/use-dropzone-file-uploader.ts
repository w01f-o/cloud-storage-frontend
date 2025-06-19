import { FileErrors, useUploadFile } from '@/_entities/file';
import { catchApiError } from '@/_shared/lib';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import {
  DropzoneInputProps,
  DropzoneRootProps,
  ErrorCode,
  useDropzone,
} from 'react-dropzone';
import { toast } from 'sonner';

interface UseDropzoneFileUploaderParams {
  folderId: string;
}

interface UseDropzoneFileUploaderReturn {
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  isDragActive: boolean;
  open: () => void;
}

export const useDropzoneFileUploader = ({
  folderId,
}: UseDropzoneFileUploaderParams): UseDropzoneFileUploaderReturn => {
  const FILES_LIMIT = 10;

  const t = useTranslations('DropzoneFileUploader');
  const { mutate, isPending } = useUploadFile({
    onMutate: ({ file: { name } }) => {
      toast.info(t('started', { name }));
    },
    onSuccess: ({ displayName }) => {
      toast.success(t('success', { name: displayName }));
    },
    onError: (error, { file: { name } }) => {
      if (error.code === 'ERR_CANCELED') return;

      switch (catchApiError(error).message) {
        case FileErrors.NOT_ENOUGH_SPACE:
          toast.error(t('errors.server.notEnoughSpace', { name }));
          break;
        default:
          toast.error(t('errors.server.unknown', { name }));
          break;
      }
    },
  });

  const dropAcceptHandler = (files: File[]) => {
    files.forEach(file => {
      mutate({ file, storeId: nanoid(), folderId });
    });
  };

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    onDropAccepted: dropAcceptHandler,
    onDropRejected: files => {
      if (
        files[0].errors.some(error => error.code === ErrorCode.TooManyFiles)
      ) {
        toast.error(t('errors.tooManyFiles', { limit: String(FILES_LIMIT) }));
      }
    },
    noClick: true,
    maxFiles: FILES_LIMIT,
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    if (isPending) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPending]);

  return {
    getInputProps,
    getRootProps,
    isDragActive,
    open,
  };
};

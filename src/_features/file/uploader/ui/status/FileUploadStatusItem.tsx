import { UploadingFile } from '@/_entities/file';
import { Progress } from '@/_shared/ui/progress';
import { IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { FC, memo } from 'react';

interface FileUploadStatusItemProps {
  file: UploadingFile;
  onAbort: () => void;
}

export const FileUploadStatusItem: FC<FileUploadStatusItemProps> = memo(
  ({ file, onAbort }) => {
    const t = useTranslations('FileUploadStatus');

    return (
      <div className='border-secondary flex flex-col pt-1 pb-3 not-last:border-b'>
        <div className='truncate'>{file.name}</div>
        <div className='flex items-center gap-2'>
          <div title={`${file.progress}%`} className='flex-grow'>
            <Progress value={file.progress} />
          </div>
          <button onClick={onAbort} title={t('button')}>
            <IconX />
          </button>
        </div>
      </div>
    );
  }
);
FileUploadStatusItem.displayName = 'FileUploadStatusItem';

import { UploadingFile } from '@/_entities/file';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/_shared/ui';
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
      <div className='border-secondary flex flex-col pt-1.5 pb-2 text-sm not-last:border-b'>
        <div className='truncate'>{file.name}</div>
        <div className='flex items-center gap-2'>
          <Tooltip delayDuration={10}>
            <TooltipTrigger asChild>
              <div className='flex-grow'>
                <Progress value={file.progress} />
              </div>
            </TooltipTrigger>
            <TooltipContent>{file.progress}%</TooltipContent>
          </Tooltip>
          <button onClick={onAbort} title={t('button')}>
            <IconX />
          </button>
        </div>
      </div>
    );
  }
);
FileUploadStatusItem.displayName = 'FileUploadStatusItem';

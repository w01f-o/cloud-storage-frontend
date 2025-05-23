import { useUploadFileProgresses } from '@/_entities/file/lib/stores/upload-progresses-store';
import {
  Button,
  FadeInOut,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_shared/ui';
import { IconFileUpload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FileUploadStatusItem } from './FileUploadStatusItem';

export const FileUploadStatusList: FC = () => {
  const { files, abortUpload } = useUploadFileProgresses();
  const t = useTranslations('FileUploadStatus');

  return (
    <FadeInOut isVisible={!!files.length} className='fixed top-6 right-6 z-30'>
      <Popover>
        <PopoverTrigger asChild>
          <Button isIconOnly radius='full' color='secondary' disableAnimation>
            <IconFileUpload />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='end'>
          <div className='pb-0.5 text-lg font-semibold'>{t('title')}</div>
          <div className='flex w-md flex-col gap-2'>
            {files.map(file => (
              <FileUploadStatusItem
                key={file.id}
                file={file}
                onAbort={() => abortUpload(file.id)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </FadeInOut>
  );
};

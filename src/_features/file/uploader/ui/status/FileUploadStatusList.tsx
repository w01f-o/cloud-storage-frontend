import { useUploadFileProgresses } from '@/_entities/file';
import {
  Button,
  FadeInOut,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_shared/ui';
import { ScrollContainer } from '@/_shared/ui';
import { IconFileUpload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { FileUploadStatusItem } from './FileUploadStatusItem';

export const FileUploadStatusList: FC = () => {
  const { files, abortUpload } = useUploadFileProgresses();
  const t = useTranslations('FileUploadStatus');
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <FadeInOut
      isVisible={!!files.length}
      className='fixed bottom-6 left-6 z-30 lg:top-6 lg:right-6'
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button isIconOnly radius='full' color='secondary' disableAnimation>
            <IconFileUpload />
          </Button>
        </PopoverTrigger>
        <PopoverContent align={isMobile ? 'start' : 'end'}>
          <div className='pb-0.5 text-lg font-semibold'>{t('title')}</div>
          <ScrollContainer>
            <div className='flex max-h-[calc(100vh-16rem)] w-[calc(100vw-6rem)] flex-col gap-2 md:w-md'>
              {files.map(file => (
                <FileUploadStatusItem
                  key={file.id}
                  file={file}
                  onAbort={() => abortUpload(file.id)}
                />
              ))}
            </div>
          </ScrollContainer>
        </PopoverContent>
      </Popover>
    </FadeInOut>
  );
};

'use client';

import { DropzoneFileUploader } from '@/_features/file';
import { FileList, FileListLoader } from '@/_widgets/file';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useFolderPage } from '../model/hooks/use-folder-page';

export const FolderPage: FC = () => {
  const t = useTranslations('FolderPage');
  const {
    cursorRef,
    fileList,
    isEmpty,
    folderName,
    isFetchingNextPage,
    folderId,
  } = useFolderPage();

  return (
    <div className='flex size-full flex-col'>
      <DropzoneFileUploader folderId={folderId} withIcon>
        <h1 className='pb-6 text-4xl font-bold'>{folderName}</h1>
        {isEmpty && (
          <div className='flex basis-2/5 items-end justify-center text-center text-4xl font-bold lg:basis-1/3'>
            {t('empty')}
          </div>
        )}
        <FileList list={fileList} cursorRef={cursorRef} />
        {isFetchingNextPage && <FileListLoader />}
      </DropzoneFileUploader>
    </div>
  );
};

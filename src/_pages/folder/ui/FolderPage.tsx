'use client';

import { useInfiniteFolderFiles } from '@/_entities/file';
import { Folder, useFolder } from '@/_entities/folder';
import { DropzoneFileUploader } from '@/_features/file';
import { useInfiniteScroll } from '@/_shared/lib';
import { FileList, FileListLoader } from '@/_widgets/file';
import { useParams } from 'next/navigation';
import { FC } from 'react';

export const FolderPage: FC = () => {
  const { id } = useParams<Pick<Folder, 'id'>>();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteFolderFiles(
      { folderId: id },
      { select: data => data.pages.flatMap(page => page.list) }
    );
  const { data: folderName } = useFolder({ id }, { select: data => data.name });

  const cursorRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  return (
    <div className='flex size-full flex-col'>
      <DropzoneFileUploader folderId={id} withIcon>
        <h1 className='pb-6 text-4xl font-bold'>{folderName}</h1>
        <FileList list={data} cursorRef={cursorRef} />
        {isFetchingNextPage && <FileListLoader />}
      </DropzoneFileUploader>
    </div>
  );
};

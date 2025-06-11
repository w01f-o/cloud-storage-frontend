import { File, useInfiniteFolderFiles } from '@/_entities/file';
import { Folder, useFolder } from '@/_entities/folder';
import { useInfiniteScroll } from '@/_shared/lib';
import { useParams } from 'next/navigation';
import { Ref } from 'react';

interface UseFolderPageReturn {
  fileList: File[];
  isFetchingNextPage: boolean;
  cursorRef: Ref<HTMLButtonElement>;
  folderName: string;
  isEmpty: boolean;
  folderId: string;
}

export const useFolderPage = (): UseFolderPageReturn => {
  const { id } = useParams<Pick<Folder, 'id'>>();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteFolderFiles(
      { folderId: id, perPage: 36 },
      { select: data => data.pages.flatMap(page => page.list) }
    );

  const { data: folderName } = useFolder({ id }, { select: data => data.name });

  const cursorRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  return {
    fileList: data,
    isFetchingNextPage,
    cursorRef,
    folderName,
    isEmpty: !data.length,
    folderId: id,
  };
};

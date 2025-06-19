'use client';

import { FoldersSearchField } from '@/_features/folder';
import {
  CreateFolderFormModal,
  FolderList,
  FolderListLoader,
} from '@/_widgets/folder';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useHomePage } from '../model/hooks/use-home-page';

export const HomePage: FC = () => {
  const t = useTranslations('HomePage');
  const {
    cursorRef,
    isEmpty,
    setIsSearching,
    shouldShowLoader,
    searchQuery,
    folderList,
    isFetchingNextPage,
  } = useHomePage();

  return (
    <div className='h-full pt-6 pb-4'>
      <FoldersSearchField setIsSearching={setIsSearching} />

      {shouldShowLoader && (
        <div className='py-8'>
          <FolderListLoader className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7' />
        </div>
      )}

      {!shouldShowLoader && isEmpty && (
        <>
          <div className='flex h-[80%] flex-col items-center justify-center gap-6 text-5xl'>
            {!searchQuery && (
              <>
                <div className='text-center'>{t('youDontHaveFolders')}</div>
                <CreateFolderFormModal />
              </>
            )}
            {searchQuery && (
              <div className='text-center'>{t('foldersNotFound')}</div>
            )}
          </div>
        </>
      )}

      {!isEmpty && (
        <div className='py-8'>
          <FolderList
            folders={folderList}
            cursorRef={cursorRef}
            className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7'
          />
          {isFetchingNextPage && (
            <FolderListLoader className='grid-cols-1 pt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7' />
          )}
          <div className='flex w-full justify-center pt-6'>
            <CreateFolderFormModal />
          </div>
        </div>
      )}
    </div>
  );
};

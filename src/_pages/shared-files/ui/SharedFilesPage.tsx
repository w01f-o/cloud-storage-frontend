'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/_shared/ui';
import { FileList } from '@/_widgets/file';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useSharedFilesPage } from '../model/hooks/use-shared-files-page';

export const SharedFilesPage: FC = () => {
  const t = useTranslations('SharedFilePage');
  const {
    list,
    nextHref,
    paginationIsVisible,
    prevHref,
    isEmpty,
    isHasNext,
    isHasPrev,
    links,
  } = useSharedFilesPage();

  return (
    <div className='flex size-full flex-col justify-between py-6'>
      {isEmpty && (
        <h3 className='grid h-[90%] place-items-center text-center text-5xl font-semibold lg:h-4/5'>
          {t('empty')}
        </h3>
      )}

      <FileList list={list} />
      {paginationIsVisible && (
        <Pagination>
          <PaginationContent>
            <PaginationPrevious href={prevHref} isDisabled={!isHasPrev} />
            {links.map(({ href, key, isActive }) => (
              <PaginationItem key={key} href={href} isActive={isActive}>
                {key}
              </PaginationItem>
            ))}
            <PaginationNext href={nextHref} isDisabled={!isHasNext} />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

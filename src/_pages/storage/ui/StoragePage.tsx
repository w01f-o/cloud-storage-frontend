'use client';

import { useUserStorage } from '@/_entities/storage';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { StorageFileTypeDistribution } from './file-type-distribution/StorageFileTypeDistribution';
import { StorageDoughnut } from './StorageDoughnut';
import { StorageSummary } from './StorageSummary';

export const StoragePage: FC = () => {
  const { data: isEmpty } = useUserStorage(
    {},
    { select: data => !data.files.length }
  );
  const t = useTranslations();

  if (isEmpty) {
    return (
      <div className='grid h-[90%] place-items-center text-center text-5xl font-semibold lg:h-4/5'>
        {t('StoragePage.empty')}
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col items-center gap-12 px-2 py-2 md:px-8 md:py-8 lg:flex-row lg:justify-between lg:py-0 xl:px-20 2xl:gap-0'>
      <div className='flex w-full flex-col gap-3 lg:w-1/2 2xl:w-1/3'>
        <StorageDoughnut />
        <StorageSummary />
      </div>
      <div className='w-full lg:w-1/2'>
        <StorageFileTypeDistribution />
      </div>
    </div>
  );
};

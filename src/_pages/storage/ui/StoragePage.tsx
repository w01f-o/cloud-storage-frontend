'use client';

import { FC } from 'react';
import { StorageFileTypeDistribution } from './file-type-distribution/StorageFileTypeDistribution';
import { StorageDoughnut } from './StorageDoughnut';
import { StorageSummary } from './StorageSummary';

export const StoragePage: FC = () => {
  return (
    <div className='flex h-full items-center justify-between px-20'>
      <div className='flex w-1/3 flex-col gap-3'>
        <StorageDoughnut />
        <StorageSummary />
      </div>
      <div className='w-1/2'>
        <StorageFileTypeDistribution />
      </div>
    </div>
  );
};

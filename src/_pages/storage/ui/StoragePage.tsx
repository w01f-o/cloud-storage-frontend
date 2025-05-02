'use client';

import { FC } from 'react';
import { StorageDoughnut } from './StorageDoughnut';
import { StorageFileTypeDistribution } from './StorageFileTypeDistribution';
import { StorageSummary } from './StorageSummary';

export const StoragePage: FC = () => {
  return (
    <div className='flex h-full items-center justify-between px-20'>
      <div className='flex w-1/3 flex-col gap-3'>
        <StorageDoughnut />
        <StorageSummary />
      </div>
      <div className='w-1/3'>
        <StorageFileTypeDistribution />
      </div>
    </div>
  );
};

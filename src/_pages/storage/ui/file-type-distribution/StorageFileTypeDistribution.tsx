'use client';

import { useUserStorage } from '@/_entities/storage';
import { FC } from 'react';
import { FileDistributionItem } from './FileDistributionItem';

export const StorageFileTypeDistribution: FC = () => {
  const {
    data: {
      files,
      space: { used },
    },
  } = useUserStorage();

  return (
    <div className='flex flex-col gap-3'>
      {files.map(file => (
        <FileDistributionItem used={used} item={file} key={file.resolvedType} />
      ))}
    </div>
  );
};

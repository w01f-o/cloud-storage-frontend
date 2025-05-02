'use client';

import { useUserStorage } from '@/_entities/storage';
import { Progress } from '@/_shared/ui/progress';
import { FC } from 'react';

export const StorageFileTypeDistribution: FC = () => {
  const {
    data: {
      files,
      space: { used },
    },
  } = useUserStorage();

  const convertToMb = (size: bigint) => Number(size / 1024n / 1024n);

  return (
    <div className='flex flex-col gap-6'>
      {files.map(({ mimeType, size }) => (
        <Progress
          value={(convertToMb(size) / convertToMb(used)) * 100}
          key={mimeType}
          dir='rtl'
        />
      ))}
    </div>
  );
};

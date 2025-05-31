import { Skeleton } from '@/_shared/ui';
import { FC } from 'react';

interface FolderListLoader {
  length?: number;
}

export const FolderListLoader: FC<FolderListLoader> = ({ length = 36 }) => {
  return (
    <div className='grid grid-cols-6 gap-5'>
      {Array.from({ length }).map((_, index) => (
        <Skeleton key={index} wrapperClassName='h-32 rounded-2xl' />
      ))}
    </div>
  );
};

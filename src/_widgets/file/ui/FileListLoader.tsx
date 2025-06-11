import { Skeleton } from '@/_shared/ui';
import { FC } from 'react';

export const FileListLoader: FC = () => {
  return (
    <div className=''>
      {Array.from({ length: 36 }).map((_, index) => (
        <Skeleton key={index} wrapperClassName='h-12 rounded-2xl' />
      ))}
    </div>
  );
};

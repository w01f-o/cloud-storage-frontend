import { Skeleton } from '@/_shared/ui';
import { FC } from 'react';

export const FileListLoader: FC = () => {
  return (
    <div className='flex flex-col gap-6 pt-6'>
      {Array.from({ length: 16 }).map((_, index) => (
        <Skeleton key={index} wrapperClassName='h-12 rounded-2xl' />
      ))}
    </div>
  );
};

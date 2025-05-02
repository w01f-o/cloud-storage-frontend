import { Skeleton } from '@/_shared/ui';
import { FC } from 'react';

export const LocaleSwitcherLoader: FC = () => {
  return (
    <div className='flex max-w-[300px] items-center gap-4'>
      <Skeleton wrapperClassName='h-6 rounded-md w-2/3' />
      <Skeleton wrapperClassName='h-10 rounded-md' />
    </div>
  );
};

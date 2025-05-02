import { Skeleton } from '@/_shared/ui';
import { FC } from 'react';

export const SettingsRowLoader: FC = () => {
  return (
    <div className='flex items-center gap-4'>
      <Skeleton wrapperClassName='h-6 min-w-36 flex-1 rounded-md' />
      <Skeleton wrapperClassName='h-10 min-w-60 rounded-md' />
    </div>
  );
};

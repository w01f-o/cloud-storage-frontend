import { Skeleton } from '@/_shared/ui';
import { FC } from 'react';

export const SettingsRowLoader: FC = () => {
  return (
    <div className='flex items-center gap-4'>
      <Skeleton wrapperClassName='h-11 min-w-60 rounded-md' />
    </div>
  );
};

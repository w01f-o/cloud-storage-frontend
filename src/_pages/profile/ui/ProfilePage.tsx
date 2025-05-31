'use client';

import { useSession } from '@/_entities/auth';
import { getApiStaticUrl } from '@/_shared/lib';
import { Avatar } from '@/_shared/ui';
import { FC } from 'react';
import { LastUpdatedFolders } from './LastUpdatedFolders';
import { LastUploadedFiles } from './LastUploadedFiles';

export const ProfilePage: FC = () => {
  const user = useSession();

  if (!user) return null;

  return (
    <>
      <div className='flex flex-col items-center pt-10 pb-6'>
        <Avatar
          src={user.avatar ? getApiStaticUrl(user.avatar) : null}
          size='xl'
          className='mb-4'
        />
        <h2 className='text-4xl'>{user.name}</h2>
        <p className='text-lg opacity-70'>{user.email}</p>
      </div>
      <div className='flex flex-col justify-between gap-20 lg:flex-row'>
        <LastUpdatedFolders />
        <LastUploadedFiles />
      </div>
    </>
  );
};

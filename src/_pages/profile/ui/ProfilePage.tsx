'use client';

import { useSession } from '@/_entities/auth';
import { getApiStaticUrl } from '@/_shared/lib';
import { Avatar, Heading, Text } from '@/_shared/ui';
import { FC } from 'react';
import { LastUpdatedFolders } from './LastUpdatedFolders';
import { LastUploadedFiles } from './LastUploadedFiles';

export const ProfilePage: FC = () => {
  const user = useSession();

  return (
    <>
      <div className='flex flex-col items-center gap-2.5 pt-10 pb-4'>
        <Avatar
          src={user?.avatar ? getApiStaticUrl(user.avatar) : null}
          size='xl'
        />
        <Heading size='xl' as='h2'>
          {user!.name}
        </Heading>
        <Text size='lg' className='opacity-70'>
          {user!.email}
        </Text>
      </div>
      <div className='flex justify-between'>
        <LastUpdatedFolders />
        <LastUploadedFiles />
      </div>
    </>
  );
};

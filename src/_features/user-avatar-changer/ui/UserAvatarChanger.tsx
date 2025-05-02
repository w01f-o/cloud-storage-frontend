'use client';

import { useSession } from '@/_entities/auth';
import { getApiStaticUrl } from '@/_shared/lib';
import { Avatar } from '@/_shared/ui';
import { FC } from 'react';

export const UserAvatarChanger: FC = () => {
  const user = useSession();

  return <Avatar src={getApiStaticUrl(user!.avatar!)} />;
};

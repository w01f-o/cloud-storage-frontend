'use client';

import { useSession } from '@/_entities/auth';
import { Link } from '@/_shared/i18n';
import { getApiStaticUrl } from '@/_shared/lib';
import { RoutePaths } from '@/_shared/router';
import { Avatar } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const CurrentUser: FC = () => {
  const user = useSession();
  const t = useTranslations();

  if (!user) {
    return (
      <Link
        href={RoutePaths.LOGIN}
        className='flex w-full items-center gap-2.5 pr-7 pl-5'
      >
        <Avatar src={null} />
        <div className='flex w-0 flex-1 flex-col'>
          <h5 className='truncate text-[1.125rem]'>
            {t('AuthPage.actions.login')}
          </h5>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={RoutePaths.PROFILE}
      className='flex w-full items-center gap-2.5 pr-7 pl-5'
    >
      <Avatar src={user?.avatar ? getApiStaticUrl(user.avatar) : null} />
      <div className='flex w-0 flex-1 flex-col'>
        <h5 className='truncate text-[1.125rem] font-semibold'>{user.name}</h5>
        <span className='truncate text-sm'>{user.email}</span>
      </div>
    </Link>
  );
};

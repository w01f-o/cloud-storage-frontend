'use client';

import { useSession } from '@/_entities/auth';
import { Link } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Avatar, Caption, Heading } from '@/_shared/ui';
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
        <Avatar src={null} size='default' />
        <div className='flex w-0 flex-1 flex-col'>
          <Heading size='default' className='truncate'>
            {t('AuthPage.actions.login')}
          </Heading>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={RoutePaths.PROFILE}
      className='flex w-full items-center gap-2.5 pr-7 pl-5'
    >
      <Avatar src={user?.avatar ?? null} size='default' />
      <div className='flex w-0 flex-1 flex-col'>
        <Heading size='default' className='truncate'>
          {user.name}
        </Heading>
        <Caption size='md' className='truncate'>
          {user.email}
        </Caption>
      </div>
    </Link>
  );
};

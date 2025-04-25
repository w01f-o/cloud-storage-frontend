'use client';

import { useSession } from '@/_entities/auth';
import { Link } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Avatar, Caption, Heading } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const CurrentUser: FC = () => {
  const { isAuth, user } = useSession();
  const t = useTranslations();

  console.log(isAuth);
  console.log(user);

  return (
    <Link
      href={isAuth ? RoutePaths.PROFILE : RoutePaths.LOGIN}
      className='flex w-full items-center gap-2.5 pr-7 pl-5'
    >
      <Avatar src={user?.avatar ?? null} />
      <div className='flex w-0 flex-1 flex-col'>
        {isAuth ? (
          <>
            <Heading size='default' className='truncate'>
              {user.name}
            </Heading>
            <Caption size='md' className='truncate'>
              {user.email}
            </Caption>
          </>
        ) : (
          <Heading size='default' className='truncate'>
            {t('AuthPage.actions.login')}
          </Heading>
        )}
      </div>
    </Link>
  );
};

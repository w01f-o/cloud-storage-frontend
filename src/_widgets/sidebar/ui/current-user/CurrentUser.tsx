// import { useSession } from '@/_entities/auth';
import { Link } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Avatar, Caption, Heading } from '@/_shared/ui';
import { FC } from 'react';

export const CurrentUser: FC = () => {
  // const { user } = useSession();

  return (
    <Link
      href={RoutePaths.PROFILE}
      className='flex w-full items-center gap-2.5 pr-7 pl-5'
    >
      <Avatar src='/150.jpg' />
      <div className='flex w-0 flex-1 flex-col'>
        <Heading size='default' className='truncate'>
          {'Иван Иванов'}
        </Heading>
        <Caption size='md' className='truncate'>
          {'example@mail.ru'}
        </Caption>
      </div>
    </Link>
  );
};

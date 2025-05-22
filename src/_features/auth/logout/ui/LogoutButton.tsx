'use client';

import { useLogout, useSession } from '@/_entities/auth';
import { useRouter } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Button } from '@/_shared/ui';
import { IconLogout } from '@tabler/icons-react';
import { FC } from 'react';

export const LogoutButton: FC = () => {
  const user = useSession();
  const router = useRouter();
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      router.push(RoutePaths.WELCOME);
    },
  });

  if (!user) return <div className='h-12'></div>;

  const clickHandler = () => {
    logout();
  };

  return (
    <div className='px-4'>
      <Button
        variant='ghost'
        color='default'
        size='lg'
        disableAnimation
        disableRipple
        className='font-semibold'
        startContent={<IconLogout />}
        onClick={clickHandler}
      >
        Выйти
      </Button>
    </div>
  );
};

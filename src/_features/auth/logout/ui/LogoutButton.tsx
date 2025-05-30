'use client';

import { useLogout, useSession } from '@/_entities/auth';
import { Button } from '@/_shared/ui';
import { IconLogout } from '@tabler/icons-react';
import { FC } from 'react';

export const LogoutButton: FC = () => {
  const user = useSession();
  const { mutate: logout, isPending } = useLogout();

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
        isLoading={isPending}
        spinnerPosition='end'
      >
        Выйти
      </Button>
    </div>
  );
};

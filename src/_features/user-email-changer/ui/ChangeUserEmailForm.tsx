'use client';

import { useSession } from '@/_entities/auth';
import { Input } from '@/_shared/ui';
import { FC } from 'react';

export const ChangeUserEmailForm: FC = () => {
  const user = useSession();

  return (
    <form>
      <Input size='sm' defaultValue={user?.email} />
    </form>
  );
};

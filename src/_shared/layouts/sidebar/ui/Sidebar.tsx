import { LogoutButton } from '@/_features/auth';
import { FC } from 'react';
import { CurrentUser } from '../../current-user/CurrentUser';
import { Navbar } from '../../navbar';

export const Sidebar: FC = () => {
  return (
    <aside className='bg-content rounded-r-content mr-12 flex h-full w-1/6 flex-col justify-between py-10 transition-colors'>
      <CurrentUser />
      <Navbar />
      <LogoutButton />
    </aside>
  );
};

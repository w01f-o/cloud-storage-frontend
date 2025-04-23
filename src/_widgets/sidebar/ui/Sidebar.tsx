import { FC } from 'react';
import { CurrentUser } from './current-user/CurrentUser';
import { LogoutButton } from './logout-button/LogoutButton';
import { Navbar } from './navbar/Navbar';

export const Sidebar: FC = () => {
  return (
    <aside className='bg-content rounded-r-content mr-12 flex h-full w-56 flex-col justify-between py-10 transition-colors'>
      <CurrentUser />
      <Navbar />
      <LogoutButton />
    </aside>
  );
};

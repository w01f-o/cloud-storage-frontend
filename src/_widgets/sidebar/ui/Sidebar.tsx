import { User } from '@/_entities/user';
import { FC } from 'react';
import { CurrentUser } from './current-user/CurrentUser';
import { LogoutButton } from './logout-button/LogoutButton';
import { Navbar } from './navbar/Navbar';

export const Sidebar: FC = () => {
  return (
    <aside className='bg-content mr-12 flex h-full w-52 flex-col justify-between rounded-r-4xl'>
      <CurrentUser user={{ name: 'w01f' } as User} />
      <Navbar />
      <LogoutButton />
    </aside>
  );
};

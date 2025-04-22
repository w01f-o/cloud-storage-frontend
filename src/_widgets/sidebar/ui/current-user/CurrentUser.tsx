import { User } from '@/_entities/user';
import { FC } from 'react';

interface CurrentUserProps {
  user: User;
}

export const CurrentUser: FC<CurrentUserProps> = ({ user }) => {
  return <div>{user.name}</div>;
};

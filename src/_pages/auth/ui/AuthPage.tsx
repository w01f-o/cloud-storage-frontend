import { AuthType } from '@/_entities/auth';
import { FC } from 'react';

interface AuthPageProps {
  type: AuthType;
}

export const AuthPage: FC<AuthPageProps> = ({ type }) => {
  return <>{type}</>;
};

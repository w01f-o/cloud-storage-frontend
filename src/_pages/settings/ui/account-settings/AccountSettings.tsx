import { UserAccountDeleter } from '@/_features/user-account-deleter';
import { UserAvatarChanger } from '@/_features/user-avatar-changer';
import { UserEmailChanger } from '@/_features/user-email-changer';
import { UserNameChanger } from '@/_features/user-name-changer';
import { UserPasswordChanger } from '@/_features/user-password-changer';
import { FC } from 'react';

export const AccountSettings: FC = () => {
  return (
    <div className='flex w-full flex-col gap-4'>
      <UserAvatarChanger />
      <UserNameChanger />
      <UserEmailChanger />
      <UserPasswordChanger />
      <UserAccountDeleter />
    </div>
  );
};

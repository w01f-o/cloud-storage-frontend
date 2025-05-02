import { UserAccountDeleter } from '@/_features/user-account-deleter';
import { UserAvatarChanger } from '@/_features/user-avatar-changer';
import { UserEmailChanger } from '@/_features/user-email-changer';
import { UserNameChanger } from '@/_features/user-name-changer';
import { UserPasswordChanger } from '@/_features/user-password-changer';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { SettingsGroup } from '../SettingsGroup';
import { SettingsRow } from '../SettingsRow';

export const AccountSettings: FC = () => {
  const t = useTranslations('SettingsPage.account');

  return (
    <SettingsGroup>
      <SettingsRow label={t('avatar.title')}>
        <UserAvatarChanger />
      </SettingsRow>
      <SettingsRow label={t('name.title')}>
        <UserNameChanger />
      </SettingsRow>
      <SettingsRow label={t('email.title')}>
        <UserEmailChanger />
      </SettingsRow>
      <SettingsRow label={t('password.title')}>
        <UserPasswordChanger />
      </SettingsRow>
      <SettingsRow label={t('delete.title')}>
        <UserAccountDeleter />
      </SettingsRow>
    </SettingsGroup>
  );
};

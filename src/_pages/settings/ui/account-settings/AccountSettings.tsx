import {
  UserAccountDeleter,
  UserAvatarChanger,
  UserEmailChanger,
  UserNameChanger,
  UserPasswordChanger,
} from '@/_features/user';
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

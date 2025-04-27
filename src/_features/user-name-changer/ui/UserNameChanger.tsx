import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { ChangeUserNameForm } from './ChangeUserNameForm';

export const UserNameChanger: FC = () => {
  const t = useTranslations('SettingsPage.account');

  return (
    <div className='flex items-center gap-4'>
      <div>{t('changeUserName')}</div>
      <ChangeUserNameForm />
    </div>
  );
};

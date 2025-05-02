import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { ChangeUserNameForm } from './ChangeUserNameForm';

export const UserNameChanger: FC = () => {
  const t = useTranslations('SettingsPage.account');

  return (
    <div className='flex gap-4'>
      <div className='w-36 pt-3'>{t('name.title')}</div>
      <ChangeUserNameForm />
    </div>
  );
};

import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { ChangeUserEmailForm } from './ChangeUserEmailForm';

export const UserEmailChanger: FC = () => {
  const t = useTranslations('SettingsPage.account');

  return (
    <div className='flex gap-4'>
      <div className='w-36 pt-3'>{t('email.title')}</div>
      <ChangeUserEmailForm />
    </div>
  );
};

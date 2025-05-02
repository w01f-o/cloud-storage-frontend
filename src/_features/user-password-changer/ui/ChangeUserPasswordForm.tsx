import { Input } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface ChangeUserPasswordFormProps {
  id: string;
}

export const ChangeUserPasswordForm: FC<ChangeUserPasswordFormProps> = ({
  id,
}) => {
  const t = useTranslations('SettingsPage.account.password');

  return (
    <form id={id} className='flex flex-col gap-2 py-2'>
      <Input size='md' label={t('currentPassword')} type='password' />
      <Input size='md' label={t('newPassword')} type='password' />
      <Input size='md' label={t('repeatNewPassword')} type='password' />
    </form>
  );
};

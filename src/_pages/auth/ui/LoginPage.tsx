import { LoginForm } from '@/_features/auth';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const LoginPage: FC = () => {
  const t = useTranslations('AuthPage');

  return (
    <div className='flex size-full flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl'>{t('title.login')}</h1>
      <LoginForm />
    </div>
  );
};

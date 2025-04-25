import { RegisterForm } from '@/_features/auth';
import { Heading } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const RegisterPage: FC = () => {
  const t = useTranslations('AuthPage');

  return (
    <div className='flex size-full flex-col items-center justify-center gap-4'>
      <Heading size='xl'>{t('title.register')}</Heading>
      <RegisterForm />
    </div>
  );
};

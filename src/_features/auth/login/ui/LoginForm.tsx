'use client';

import { Link } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Button, Input } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useLoginForm } from '../model';

export const LoginForm: FC = () => {
  const t = useTranslations('AuthPage');
  const { submitHandler, errors, isPending, register } = useLoginForm();

  return (
    <form
      onSubmit={submitHandler}
      className='flex w-full max-w-sm flex-col justify-center gap-3'
    >
      <Input
        label={t('labels.email')}
        isRequired
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        {...register('email')}
      />
      <Input
        type='password'
        label={t('labels.password')}
        isRequired
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        {...register('password')}
      />
      <p className='self-start'>
        {t.rich('labels.dontHaveAccount', {
          register: chunks => (
            <Link href={RoutePaths.REGISTER} className='text-primary underline'>
              {chunks}
            </Link>
          ),
        })}
      </p>
      <Button isLoading={isPending}>{t('actions.login')}</Button>
    </form>
  );
};

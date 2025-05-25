'use client';

import { Link } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Button, Input, Text } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useRegisterForm } from '../model';

export const RegisterForm: FC = () => {
  const t = useTranslations('AuthPage');
  const { errors, isPending, register, submitHandler } = useRegisterForm();

  return (
    <form
      onSubmit={submitHandler}
      className='flex w-full max-w-sm flex-col justify-center gap-3'
    >
      <Input
        label={t('labels.name')}
        isRequired
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        {...register('name')}
      />
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
      <Input
        type='password'
        label={t('labels.confirmPassword')}
        isRequired
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Text className='self-start'>
        {t.rich('labels.alreadyHaveAccount', {
          login: chunks => (
            <Link href={RoutePaths.LOGIN} className='text-primary underline'>
              {chunks}
            </Link>
          ),
        })}
      </Text>
      <Button isLoading={isPending}>{t('actions.register')}</Button>
    </form>
  );
};

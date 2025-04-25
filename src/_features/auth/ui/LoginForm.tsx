'use client';

import { AuthErrors, useLogin } from '@/_entities/auth';
import { Link, useRouter } from '@/_shared/i18n';
import { catchApiError } from '@/_shared/lib';
import { RoutePaths } from '@/_shared/router';
import { Button, Input, Text } from '@/_shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LoginFormSchema, loginSchema } from '../model/login-schema';

export const LoginForm: FC = () => {
  const t = useTranslations('AuthPage');

  const router = useRouter();
  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      toast.success(t('success.login'));
      router.push(RoutePaths.HOME);
    },
    onError: error => {
      const errorMessage = catchApiError<AuthErrors>(error).message;
      switch (errorMessage) {
        case AuthErrors.INVALID_CREDENTIALS:
          toast.error(t(`errors.server.invalidCredentials`));
          break;
        default:
          toast.error(t('errors.server.unknown'));
          break;
      }
    },
  });
  const {
    handleSubmit,
    register: registerField,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema(t)),
  });

  const submitHandler = (data: LoginFormSchema) => {
    login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='flex w-full max-w-sm flex-col justify-center gap-2'
    >
      <Input
        label={t('labels.email')}
        isRequired
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        autoFocus
        {...registerField('email')}
      />
      <Input
        type='password'
        label={t('labels.password')}
        isRequired
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        {...registerField('password')}
      />
      <Text className='self-start'>
        {t.rich('labels.dontHaveAccount', {
          register: chunks => (
            <Link href={RoutePaths.REGISTER} className='text-primary underline'>
              {chunks}
            </Link>
          ),
        })}
      </Text>
      <Button isLoading={isPending}>{t('actions.login')}</Button>
    </form>
  );
};

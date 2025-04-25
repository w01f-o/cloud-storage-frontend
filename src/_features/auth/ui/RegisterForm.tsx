'use client';

import { AuthErrors, useRegister } from '@/_entities/auth';
import { Link } from '@/_shared/i18n';
import { catchApiError } from '@/_shared/lib';
import { RoutePaths } from '@/_shared/router';
import { Button, Input, Text } from '@/_shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { RegisterFormSchema, registerSchema } from '../model/register-schema';

export const RegisterForm: FC = () => {
  const t = useTranslations('AuthPage');

  const { mutate: register, isPending } = useRegister({
    onSuccess: () => {
      toast.success(t('success.register'));
    },
    onError: error => {
      const errorMessage = catchApiError<AuthErrors>(error).message;
      switch (errorMessage) {
        case AuthErrors.USER_ALREADY_EXISTS:
          toast.error(t(`errors.server.userAlreadyExists`));
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
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema(t)),
  });

  const submitHandler = ({
    confirmPassword: _,
    ...data
  }: RegisterFormSchema) => {
    register(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='flex w-full max-w-sm flex-col justify-center gap-2'
    >
      <Input
        label={t('labels.name')}
        isRequired
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        autoFocus
        {...registerField('name')}
      />
      <Input
        label={t('labels.email')}
        isRequired
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
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
      <Input
        type='password'
        label={t('labels.confirmPassword')}
        isRequired
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...registerField('confirmPassword')}
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

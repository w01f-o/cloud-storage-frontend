'use client';

import { Button, FadeInOut, Input } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useChangeEmailForm } from '../model/hooks/use-change-email-form';

export const ChangeUserEmailForm: FC = () => {
  const { errors, register, submitHandler, buttonIsVisible, currentEmail } =
    useChangeEmailForm();
  const t = useTranslations('SettingsPage.account.email');

  return (
    <form className='flex gap-2' onSubmit={submitHandler}>
      <Input
        size='sm'
        {...register('email')}
        isInvalid={!!errors.email?.message}
        defaultValue={currentEmail}
      />
      <FadeInOut isVisible={buttonIsVisible}>
        <Button className='mt-1'>{t('title')}</Button>
      </FadeInOut>
    </form>
  );
};

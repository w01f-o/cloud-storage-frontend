'use client';

import { Button, FadeInOut, Input } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useChangeUserNameForm } from '../model';

export const ChangeUserNameForm: FC = () => {
  const t = useTranslations('common');
  const { buttonIsVisible, errors, register, submitHandler, currentName } =
    useChangeUserNameForm();

  return (
    <form className='flex gap-2' onSubmit={submitHandler}>
      <Input
        size='sm'
        {...register('name')}
        isInvalid={!!errors.name?.message}
        defaultValue={currentName}
      />
      <FadeInOut isVisible={buttonIsVisible}>
        <Button className='mt-1'>{t('save')}</Button>
      </FadeInOut>
    </form>
  );
};

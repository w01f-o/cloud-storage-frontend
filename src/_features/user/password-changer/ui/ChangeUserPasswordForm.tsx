import { Input } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useChangePasswordForm } from '../model/hooks/useChangePasswordForm';

interface ChangeUserPasswordFormProps {
  id: string;
  closeModal: () => void;
}

export const ChangeUserPasswordForm: FC<ChangeUserPasswordFormProps> = ({
  id,
  closeModal,
}) => {
  const t = useTranslations('SettingsPage.account.password');
  const { errors, register, submitHandler } = useChangePasswordForm({
    closeModal,
  });

  return (
    <form id={id} className='flex flex-col gap-2 py-2' onSubmit={submitHandler}>
      <Input
        size='md'
        label={t('currentPassword')}
        type='password'
        isInvalid={!!errors.currentPassword?.message}
        errorMessage={errors.currentPassword?.message}
        {...register('currentPassword')}
      />
      <Input
        size='md'
        label={t('newPassword')}
        type='password'
        isInvalid={!!errors.newPassword?.message}
        errorMessage={errors.newPassword?.message}
        {...register('newPassword')}
      />
      <Input
        size='md'
        label={t('repeatNewPassword')}
        type='password'
        isInvalid={!!errors.confirmPassword?.message}
        errorMessage={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
    </form>
  );
};

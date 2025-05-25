import { AuthErrors } from '@/_entities/auth';
import { useUpdateUser } from '@/_entities/user';
import { catchApiError } from '@/_shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from '../schemas/change-password-schema';

interface UseChangePasswordFormReturn {
  register: UseFormRegister<ChangePasswordSchema>;
  submitHandler: () => void;
  errors: FieldErrors<ChangePasswordSchema>;
  isPending: boolean;
}

interface UseChangePasswordFormParams {
  closeModal: () => void;
}

export const useChangePasswordForm = (
  params: UseChangePasswordFormParams
): UseChangePasswordFormReturn => {
  const t = useTranslations('SettingsPage.account.password');
  const { mutate, isPending } = useUpdateUser({
    onError(error) {
      const errorMessage = catchApiError<AuthErrors>(error);

      switch (errorMessage.message) {
        case AuthErrors.INVALID_CREDENTIALS:
          toast.error(t('errors.server.invalidCredentials'));
          break;
        default:
          toast.error(t('errors.server.unknown'));
          break;
      }
    },
    onSuccess() {
      toast.success(t('success'));
      params.closeModal();
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema(t)),
  });

  const submitHandler = (data: ChangePasswordSchema) => {
    mutate({ password: data.newPassword, oldPassword: data.currentPassword });
  };

  return {
    submitHandler: handleSubmit(submitHandler),
    register,
    errors,
    isPending,
  };
};

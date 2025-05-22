import { useUpdateUser } from '@/_entities/user/lib/hooks/useUpdateUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
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

export const useChangePasswordForm = (): UseChangePasswordFormReturn => {
  const t = useTranslations('AuthPage');
  const { mutate, isPending } = useUpdateUser();

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

import { useSession } from '@/_entities/auth';
import { User } from '@/_entities/user';
import { useUpdateUser } from '@/_entities/user/lib/hooks/useUpdateUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
import {
  changeEmailSchema,
  ChangeEmailSchema,
} from '../schemas/change-email-schema';

interface UseChangeEmailFormReturn {
  register: UseFormRegister<ChangeEmailSchema>;
  submitHandler: () => void;
  errors: FieldErrors<ChangeEmailSchema>;
  buttonIsVisible: boolean;
  currentEmail?: User['email'];
}

export const useChangeEmailForm = (): UseChangeEmailFormReturn => {
  const t = useTranslations('SettingsPage.account.email');

  const { mutate } = useUpdateUser({
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: () => {
      toast.error(t('errors.server.unknown'));
    },
  });

  const user = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema(t)),
    defaultValues: {
      email: user?.email,
    },
  });

  const submitHandler = (data: ChangeEmailSchema) => {
    mutate(data);
  };

  const errorHandler = (errors: FieldErrors<ChangeEmailSchema>) => {
    toast.error(errors?.email?.message, { duration: 5000 });
  };

  const buttonIsVisible = watch('email') !== user?.email;

  return {
    submitHandler: handleSubmit(submitHandler, errorHandler),
    register,
    errors,
    buttonIsVisible,
    currentEmail: user?.email,
  };
};

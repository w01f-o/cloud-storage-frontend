import { useSession } from '@/_entities/auth';
import { User } from '@/_entities/user';
import { useUpdateUser } from '@/_entities/user/lib/hooks/useUpdateUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
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
  const { mutate } = useUpdateUser();
  const t = useTranslations('AuthPage');
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

  const buttonIsVisible = watch('email') !== user?.email;

  return {
    submitHandler: handleSubmit(submitHandler),
    register,
    errors,
    buttonIsVisible,
    currentEmail: user?.email,
  };
};

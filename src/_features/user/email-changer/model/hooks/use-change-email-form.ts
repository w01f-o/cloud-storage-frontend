import { AuthErrors, useSession } from '@/_entities/auth';
import { User, useUpdateUser } from '@/_entities/user';
import { catchApiError } from '@/_shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
import {
  changeEmailFormSchema,
  ChangeEmailFormSchema,
} from '../schemas/change-email-form-schema';

interface UseChangeEmailFormReturn {
  register: UseFormRegister<ChangeEmailFormSchema>;
  submitHandler: () => void;
  errors: FieldErrors<ChangeEmailFormSchema>;
  buttonIsVisible: boolean;
  currentEmail?: User['email'];
}

export const useChangeEmailForm = (): UseChangeEmailFormReturn => {
  const t = useTranslations('SettingsPage.account.email');

  const { mutate } = useUpdateUser({
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: error => {
      const errorMessage = catchApiError<AuthErrors>(error).message;

      switch (errorMessage) {
        case AuthErrors.NOT_CONFIRMED_ACCOUNT:
          toast.error(t('errors.server.userAlreadyExists'));
          break;
        default:
          toast.error(t('errors.server.unknown'));
          break;
      }
    },
  });

  const user = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ChangeEmailFormSchema>({
    resolver: zodResolver(changeEmailFormSchema(t)),
    defaultValues: {
      email: user?.email,
    },
  });

  const submitHandler = (data: ChangeEmailFormSchema) => {
    mutate(data);
  };

  const errorHandler = (errors: FieldErrors<ChangeEmailFormSchema>) => {
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

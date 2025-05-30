import { AuthErrors, useRegister } from '@/_entities/auth';
import { catchApiError, navigate } from '@/_shared/lib';
import { RoutePaths } from '@/_shared/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
import {
  registerFormSchema,
  RegisterFormSchema,
} from '../schemas/register-form-schema';

interface UseRegisterFormReturn {
  submitHandler: () => void;
  register: UseFormRegister<RegisterFormSchema>;
  errors: FieldErrors<RegisterFormSchema>;
  isPending: boolean;
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  const t = useTranslations('AuthPage');

  const [isRouterPending, startRouterTransition] = useTransition();

  const { mutate: register, isPending } = useRegister({
    onSuccess: () => {
      toast.success(t('success.register'));
      startRouterTransition(() => {
        navigate(RoutePaths.HOME);
      });
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
    resolver: zodResolver(registerFormSchema(t)),
  });

  const submitHandler = ({
    confirmPassword: _,
    ...data
  }: RegisterFormSchema) => {
    register(data);
  };

  return {
    submitHandler: handleSubmit(submitHandler),
    errors,
    isPending: isPending || isRouterPending,
    register: registerField,
  };
};

import { AuthErrors, useLogin } from '@/_entities/auth';
import { useRouter } from '@/_shared/i18n';
import { catchApiError, navigate } from '@/_shared/lib';
import { RoutePaths } from '@/_shared/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
import { loginFormSchema, LoginFormSchema } from '../schemas/login-form-schema';

interface UseLoginFormReturn {
  submitHandler: () => void;
  register: UseFormRegister<LoginFormSchema>;
  errors: FieldErrors<LoginFormSchema>;
  isPending: boolean;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const t = useTranslations('AuthPage');

  const [isRouterPending, startRouterTransition] = useTransition();
  const router = useRouter();

  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      toast.success(t('success.login'));
      startRouterTransition(() => {
        router.refresh();
        navigate(RoutePaths.HOME);
      });
    },
    onError: error => {
      const errorMessage = catchApiError<AuthErrors>(error).message;
      switch (errorMessage) {
        case AuthErrors.INVALID_CREDENTIALS:
          toast.error(t(`errors.server.invalidCredentials`));
          break;
        default:
          toast.error(t('errors.server.unknown'));
          break;
      }
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema(t)),
  });

  const submitHandler = (data: LoginFormSchema) => {
    login(data);
  };

  return {
    submitHandler: handleSubmit(submitHandler),
    register,
    errors,
    isPending: isPending || isRouterPending,
  };
};

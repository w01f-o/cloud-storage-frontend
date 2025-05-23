import { AuthErrors, useLogin } from '@/_entities/auth';
import { useRouter } from '@/_shared/i18n';
import { catchApiError } from '@/_shared/lib';
import { RoutePaths } from '@/_shared/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LoginFormSchema, loginSchema } from '../schemas/login-schema';

export const useLoginForm = () => {
  const t = useTranslations('AuthPage');

  const router = useRouter();
  const [isRouterPending, startRouterTransition] = useTransition();

  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      toast.success(t('success.login'));
      startRouterTransition(() => {
        router.replace(RoutePaths.HOME);
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
    register: registerField,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema(t)),
  });

  const submitHandler = (data: LoginFormSchema) => {
    login(data);
  };

  return {
    submitHandler: handleSubmit(submitHandler),
    registerField,
    errors,
    isPending: isPending || isRouterPending,
  };
};

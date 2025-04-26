import { AuthErrors, useRegister } from '@/_entities/auth';
import { useRouter } from '@/_shared/i18n';
import { catchApiError } from '@/_shared/lib';
import { RoutePaths } from '@/_shared/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { RegisterFormSchema, registerSchema } from '../schemas/register-schema';

export const useRegisterForm = () => {
  const t = useTranslations('AuthPage');

  const router = useRouter();
  const { mutate: register, isPending } = useRegister({
    onSuccess: () => {
      toast.success(t('success.register'));
      router.push(RoutePaths.HOME);
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
    resolver: zodResolver(registerSchema(t)),
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
    isPending,
    registerField,
  };
};

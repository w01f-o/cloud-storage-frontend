import { useSession } from '@/_entities/auth';
import { useUpdateUser } from '@/_entities/user/lib/hooks/use-update-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  changeUserNameFormSchema,
  ChangeUserNameFormSchema,
} from '../schemas/change-user-name-form-schema';

export const useChangeUserNameForm = () => {
  const t = useTranslations('SettingsPage.account.name');
  const user = useSession();

  const { mutate, isPending } = useUpdateUser({
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: () => {
      toast.error(t('errors.server.unknown'));
    },
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeUserNameFormSchema>({
    resolver: zodResolver(changeUserNameFormSchema(t)),
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name,
    },
  });

  const submitHandler = (data: ChangeUserNameFormSchema) => {
    mutate(data);
  };

  const errorHandler = (errors: FieldErrors<ChangeUserNameFormSchema>) => {
    toast.error(errors?.name?.message, { duration: 5000 });
  };

  return {
    buttonIsVisible: watch('name') !== user?.name,
    register,
    submitHandler: handleSubmit(submitHandler, errorHandler),
    errors,
    isPending,
    currentName: user?.name,
  };
};

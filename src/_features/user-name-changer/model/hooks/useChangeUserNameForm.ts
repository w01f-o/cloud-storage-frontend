import { useSession } from '@/_entities/auth';
import { useUpdateUser } from '@/_entities/user/lib/hooks/useUpdateUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import {
  ChangeUserNameFormSchema,
  changeUserNameSchema,
} from '../schemas/change-user-name-schema';

export const useChangeUserNameForm = () => {
  const t = useTranslations('SettingsPage.account.name.errors');
  const user = useSession();

  const { mutate, isPending } = useUpdateUser();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeUserNameFormSchema>({
    resolver: zodResolver(changeUserNameSchema(t)),
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name,
    },
  });

  const submitHandler = (data: ChangeUserNameFormSchema) => {
    mutate(data);
  };

  return {
    buttonIsVisible: watch('name') !== user!.name,
    register,
    submitHandler: handleSubmit(submitHandler),
    errors,
    isPending,
    currentName: user!.name,
  };
};

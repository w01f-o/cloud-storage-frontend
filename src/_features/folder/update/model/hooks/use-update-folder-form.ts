import { useUpdateFolder } from '@/_entities/folder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction, useState } from 'react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
import {
  UpdateFolderSchema,
  updateFolderSchema,
} from '../schemas/update-folder-schema';

interface UpdateFolderFormParams {
  currentColor: string;
  currentName: string;
  id: string;
}

interface UpdateFolderFormReturn {
  color: string;
  isPending: boolean;
  errors: FieldErrors<UpdateFolderSchema>;
  register: UseFormRegister<UpdateFolderSchema>;
  setColor: Dispatch<SetStateAction<string>>;
  submitHandler: () => void;
}

export const useUpdateFolderForm = ({
  currentColor,
  currentName,
  id,
}: UpdateFolderFormParams): UpdateFolderFormReturn => {
  const [color, setColor] = useState<string>(currentColor);
  const t = useTranslations('FolderItem.modal.form.update');
  const { isPending, mutate } = useUpdateFolder({
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: () => {
      toast.error(t('errors.server.unknown'));
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<UpdateFolderSchema>({
    resolver: zodResolver(updateFolderSchema(t)),
    mode: 'onSubmit',
  });

  const submitHandler = (data: UpdateFolderSchema) => {
    const isAvailableToSubmit =
      data.color !== currentColor || data.name !== currentName;

    if (!isAvailableToSubmit) return;

    mutate({ id, data });
  };

  const errorHandler = (errors: FieldErrors<UpdateFolderSchema>) => {
    toast.error(errors?.name?.message, { duration: 5000 });
  };

  return {
    color,
    setColor,
    register,
    submitHandler: handleSubmit(submitHandler, errorHandler),
    isPending,
    errors,
  };
};

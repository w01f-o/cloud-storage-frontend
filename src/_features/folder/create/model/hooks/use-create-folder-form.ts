import { useCreateFolder } from '@/_entities/folder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction, useState } from 'react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
import {
  createFolderSchema,
  CreateFolderSchema,
} from '../schemas/create-folder-form-schema';

interface CreateFolderFormParams {
  closeModal: () => void;
}

interface UseCreateFolderFormReturn {
  register: UseFormRegister<CreateFolderSchema>;
  submitHandler: () => void;
  errors: FieldErrors<CreateFolderSchema>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

export const useCreateFolderForm = (
  params: CreateFolderFormParams
): UseCreateFolderFormReturn => {
  const t = useTranslations('HomePage.CreateFormModal');
  const { mutate } = useCreateFolder({
    onSuccess: () => {
      toast.success(t('success'));
      params.closeModal();
    },
    onError: () => {
      toast.error(t('errors.server.unknown'));
    },
  });
  const [color, setColor] = useState<string>('#94a0ff');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFolderSchema>({
    resolver: zodResolver(createFolderSchema(t)),
  });

  const submitHandler = (data: CreateFolderSchema) => {
    mutate(data);
  };

  const errorHandler = (errors: FieldErrors<CreateFolderSchema>) => {
    toast.error(errors?.name?.message, { duration: 5000 });
  };

  return {
    register,
    submitHandler: handleSubmit(submitHandler, errorHandler),
    errors,
    color,
    setColor,
  };
};

import { useCreateFolder } from '@/_entities/folder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction, useState } from 'react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import {
  createFolderSchema,
  CreateFolderSchema,
} from '../schemas/create-folder-schema';

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
  const { mutate } = useCreateFolder({
    onSuccess: () => {
      params.closeModal();
    },
  });
  const [color, setColor] = useState<string>('#000000');
  const t = useTranslations('FolderItem');

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

  return {
    register,
    submitHandler: handleSubmit(submitHandler),
    errors,
    color,
    setColor,
  };
};

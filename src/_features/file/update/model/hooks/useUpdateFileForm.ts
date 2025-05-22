import { useUpdateFile } from '@/_entities/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import {
  updateFileSchema,
  UpdateFileSchema,
} from '../schemas/update-file-schema';

interface UseUpdateFileFormParams {
  id: string;
  currentDisplayName: string;
}

interface UseUpdateFileFormReturn {
  register: UseFormRegister<UpdateFileSchema>;
  submitHandler: () => void;
  errors: FieldErrors<UpdateFileSchema>;
}

export const useUpdateFileForm = ({
  id,
  currentDisplayName,
}: UseUpdateFileFormParams): UseUpdateFileFormReturn => {
  const { mutate } = useUpdateFile();
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFileSchema>({
    resolver: zodResolver(updateFileSchema(t)),
  });

  const submitHandler = (data: UpdateFileSchema) => {
    if (data.displayName === currentDisplayName) return;

    mutate({ data, id });
  };

  return {
    register,
    submitHandler: handleSubmit(submitHandler),
    errors,
  };
};

import { useUpdateFile } from '@/_entities/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
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
  const t = useTranslations('FileItem.modal.form.update');
  const { mutate } = useUpdateFile({
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: () => {
      toast.error(t('errors.server.unknown'));
    },
  });

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

  const errorHandler = (errors: FieldErrors<UpdateFileSchema>) => {
    toast.error(errors?.displayName?.message, { duration: 5000 });
  };

  return {
    register,
    submitHandler: handleSubmit(submitHandler, errorHandler),
    errors,
  };
};

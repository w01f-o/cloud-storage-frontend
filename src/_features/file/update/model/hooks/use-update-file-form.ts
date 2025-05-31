import { useUpdateFile } from '@/_entities/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
import {
  updateFileFormSchema,
  UpdateFileFormSchema,
} from '../schemas/update-file-form-schema';

interface UseUpdateFileFormParams {
  id: string;
  currentDisplayName: string;
}

interface UseUpdateFileFormReturn {
  register: UseFormRegister<UpdateFileFormSchema>;
  submitHandler: () => void;
  errors: FieldErrors<UpdateFileFormSchema>;
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
  } = useForm<UpdateFileFormSchema>({
    resolver: zodResolver(updateFileFormSchema(t)),
  });

  const submitHandler = (data: UpdateFileFormSchema) => {
    if (data.displayName === currentDisplayName) return;

    mutate({ data, id });
  };

  const errorHandler = (errors: FieldErrors<UpdateFileFormSchema>) => {
    toast.error(errors?.displayName?.message, { duration: 5000 });
  };

  return {
    register,
    submitHandler: handleSubmit(submitHandler, errorHandler),
    errors,
  };
};

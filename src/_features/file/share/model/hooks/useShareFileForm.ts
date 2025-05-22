import { useShareFile } from '@/_entities/shared-file/lib/hooks/useShareFile';
import { useForm, UseFormRegister } from 'react-hook-form';

interface UseShareFileParams {
  id: string;
  currentSharedStatus: boolean;
}

interface UseShareFileSchema {
  isShared: boolean;
}

interface UseShareFileReturn {
  submitHandler: () => void;
  isPending: boolean;
  register: UseFormRegister<UseShareFileSchema>;
}

export const useShareFileForm = ({
  currentSharedStatus,
  id,
}: UseShareFileParams): UseShareFileReturn => {
  const { mutateAsync, isPending } = useShareFile();

  const { handleSubmit, register } = useForm<UseShareFileSchema>();

  const submitHandler = async ({ isShared }: UseShareFileSchema) => {
    if (isShared === currentSharedStatus) return;

    await mutateAsync({ type: currentSharedStatus ? 'unshare' : 'share', id });
  };

  return {
    submitHandler: handleSubmit(submitHandler),
    isPending,
    register,
  };
};

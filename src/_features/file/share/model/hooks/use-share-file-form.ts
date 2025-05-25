import { useShareFile } from '@/_entities/shared-file';
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
  const { mutate, isPending } = useShareFile();

  const { handleSubmit, register } = useForm<UseShareFileSchema>();

  const submitHandler = ({ isShared }: UseShareFileSchema) => {
    if (isShared === currentSharedStatus) return;

    mutate({ type: currentSharedStatus ? 'unshare' : 'share', id });
  };

  return {
    submitHandler: handleSubmit(submitHandler),
    isPending,
    register,
  };
};

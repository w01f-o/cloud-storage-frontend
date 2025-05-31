import { useShareFile } from '@/_entities/shared-file';
import { Control, useForm } from 'react-hook-form';

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
  control: Control<UseShareFileSchema>;
}

export const useShareFileForm = ({
  currentSharedStatus,
  id,
}: UseShareFileParams): UseShareFileReturn => {
  const { mutate, isPending } = useShareFile();

  const { handleSubmit, control } = useForm<UseShareFileSchema>();

  const submitHandler = ({ isShared }: UseShareFileSchema) => {
    if (isShared === currentSharedStatus) return;

    mutate({ type: currentSharedStatus ? 'unshare' : 'share', id });
  };

  return {
    submitHandler: handleSubmit(submitHandler),
    isPending,
    control,
  };
};

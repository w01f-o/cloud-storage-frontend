import { File } from '@/_entities/file';
import { Switch } from '@/_shared/ui/switch/Switch';
import { FC } from 'react';
import { useShareFileForm } from '../model/hooks/useShareFileForm';

interface ShareFileFormProps {
  file: File;
  id: string;
}

export const ShareFileForm: FC<ShareFileFormProps> = ({ file, id }) => {
  const { register, submitHandler } = useShareFileForm({
    id: file.id,
    currentSharedStatus: file.isShared,
  });

  return (
    <form id={id} onSubmit={submitHandler} className='flex items-center gap-2'>
      <Switch {...register('isShared')} defaultChecked={file.isShared} />
      <div>Make public</div>
    </form>
  );
};

import { ColorPicker, Input } from '@/_shared/ui';
import { FC } from 'react';
import { useCreateFolderForm } from '../model/hooks/useCreateFolderForm';

interface CreateFolderFormProps {
  id: string;
  closeModal: () => void;
}

export const CreateFolderForm: FC<CreateFolderFormProps> = ({
  id,
  closeModal,
}) => {
  const { errors, register, submitHandler, color, setColor } =
    useCreateFolderForm({ closeModal });

  return (
    <form onSubmit={submitHandler} className='flex flex-col gap-3 py-4' id={id}>
      <Input
        label='Folder name'
        {...register('name')}
        isInvalid={!!errors.name?.message}
      />
      <div className='flex items-center gap-4 self-start'>
        Choose folder color:
        <ColorPicker
          {...register('color')}
          color={color}
          onColorChange={setColor}
        />
      </div>
    </form>
  );
};

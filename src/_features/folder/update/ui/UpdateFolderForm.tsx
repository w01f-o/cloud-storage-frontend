import { Folder } from '@/_entities/folder';
import { ColorPicker, Input } from '@/_shared/ui';
import { FC } from 'react';
import { useUpdateFolderForm } from '../model/hooks/use-update-folder-form';

interface UpdateFolderFormProps {
  id: string;
  folder: Folder;
}

export const UpdateFolderForm: FC<UpdateFolderFormProps> = ({
  id,
  folder: { color: currentColor, name, id: folderId },
}) => {
  const { color, setColor, submitHandler, errors, register } =
    useUpdateFolderForm({
      currentColor,
      id: folderId,
      currentName: name,
    });

  return (
    <form id={id} onSubmit={submitHandler} className='flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <div className='w-1/3'>Change name:</div>
        <Input
          defaultValue={name}
          size='sm'
          {...register('name')}
          isInvalid={!!errors.name?.message}
        />
      </div>
      <div className='flex items-center gap-2'>
        <div className='w-1/3'>Change color:</div>
        <ColorPicker
          color={color}
          onColorChange={setColor}
          defaultValue={currentColor}
          {...register('color')}
        />
      </div>
    </form>
  );
};

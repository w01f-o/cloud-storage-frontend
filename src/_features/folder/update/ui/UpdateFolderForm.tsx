import { Folder } from '@/_entities/folder';
import { ColorPicker, Input } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('FolderItem.modal.form');

  return (
    <form id={id} onSubmit={submitHandler} className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <div className='w-32'>{t('name')}:</div>
        <div className='flex-grow'>
          <Input
            defaultValue={name}
            size='sm'
            {...register('name')}
            isInvalid={!!errors.name?.message}
            isFullWidth
          />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div className='w-32'>{t('color')}:</div>
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

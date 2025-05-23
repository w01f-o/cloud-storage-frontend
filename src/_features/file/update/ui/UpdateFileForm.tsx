import { File } from '@/_entities/file';
import { Input } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useUpdateFileForm } from '../model/hooks/useUpdateFileForm';

interface UpdateFileFormProps {
  id: string;
  file: File;
}

export const UpdateFileForm: FC<UpdateFileFormProps> = ({
  file: { displayName, id: fileId },
  id,
}) => {
  const { errors, register, submitHandler } = useUpdateFileForm({
    id: fileId,
    currentDisplayName: displayName,
  });
  const t = useTranslations('FileItem.modal.form');

  return (
    <form id={id} onSubmit={submitHandler}>
      <div className='flex items-center gap-2'>
        <div className='w-32'>{t('name')}:</div>
        <div className='flex-grow'>
          <Input
            defaultValue={displayName}
            size='sm'
            {...register('displayName')}
            isInvalid={!!errors.displayName?.message}
            isFullWidth
          />
        </div>
      </div>
    </form>
  );
};

import { File } from '@/_entities/file';
import { Input } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useUpdateFileForm } from '../model';

interface UpdateFileFormProps {
  formId: string;
  file: File;
}

export const UpdateFileForm: FC<UpdateFileFormProps> = ({
  file: { displayName, id },
  formId,
}) => {
  const { errors, register, submitHandler } = useUpdateFileForm({
    id,
    currentDisplayName: displayName,
  });
  const t = useTranslations('FileItem.modal.form');

  return (
    <form id={formId} onSubmit={submitHandler}>
      <div className='flex items-center gap-2'>
        <div className='w-24 md:w-32'>{t('name')}:</div>
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

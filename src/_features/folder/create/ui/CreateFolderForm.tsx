import { ColorPicker, Input } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useCreateFolderForm } from '../model';

interface CreateFolderFormProps {
  formId: string;
  closeModal: () => void;
}

export const CreateFolderForm: FC<CreateFolderFormProps> = ({
  formId,
  closeModal,
}) => {
  const { errors, register, submitHandler, color, setColor } =
    useCreateFolderForm({ closeModal });
  const t = useTranslations('HomePage.CreateFormModal.labels');

  return (
    <form
      onSubmit={submitHandler}
      className='flex flex-col gap-3 py-4'
      id={formId}
    >
      <Input
        label={t('name')}
        {...register('name')}
        isInvalid={!!errors.name?.message}
      />
      <div className='flex items-center gap-4 self-start'>
        {t('color')}:
        <ColorPicker
          {...register('color')}
          color={color}
          onColorChange={setColor}
        />
      </div>
    </form>
  );
};

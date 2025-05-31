import { File } from '@/_entities/file';
import { Switch } from '@/_shared/ui/switch/Switch';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { useShareFileForm } from '../model/hooks/use-share-file-form';

interface ShareFileFormProps {
  file: File;
  formId: string;
}

export const ShareFileForm: FC<ShareFileFormProps> = ({
  file: { id, isShared },
  formId,
}) => {
  const { submitHandler, control } = useShareFileForm({
    id,
    currentSharedStatus: isShared,
  });
  const t = useTranslations('ShareFileForm');

  return (
    <form
      id={formId}
      onSubmit={submitHandler}
      className='flex items-center gap-2'
    >
      <Controller
        name='isShared'
        control={control}
        defaultValue={isShared}
        render={({ field: { value, onChange } }) => (
          <Switch checked={value} onCheckedChange={onChange} />
        )}
      />
      <div>{t('label')}</div>
    </form>
  );
};

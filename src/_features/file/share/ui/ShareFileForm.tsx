import { File } from '@/_entities/file';
import { Switch } from '@/_shared/ui/switch/Switch';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useShareFileForm } from '../model/hooks/use-share-file-form';

interface ShareFileFormProps {
  file: File;
  formId: string;
}

export const ShareFileForm: FC<ShareFileFormProps> = ({
  file: { id, isShared },
  formId,
}) => {
  const { register, submitHandler } = useShareFileForm({
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
      <Switch {...register('isShared')} defaultChecked={isShared} />
      <div>{t('label')}</div>
    </form>
  );
};

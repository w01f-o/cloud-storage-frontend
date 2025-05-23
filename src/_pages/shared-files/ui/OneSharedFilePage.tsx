'use client';

import { downloadSharedFile } from '@/_entities/shared-file/api/requests';
import { useSharedFile } from '@/_entities/shared-file/lib/hooks/useSharedFile';
import { SharedFile } from '@/_entities/shared-file/model/types/shared-file.type';
import { Button, IconFile } from '@/_shared/ui';
import { useLocale, useTranslations } from 'next-intl';
import { notFound, useParams } from 'next/navigation';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';

export const OneSharedFilePage: FC = () => {
  const { id } = useParams<{ id: SharedFile['file']['id'] }>();
  const { data } = useSharedFile({ id });
  const locale = useLocale();
  const t = useTranslations('FileItem');
  const tResolvedType = useTranslations('resolvedFileType');

  if (!data) notFound();

  const clickHandler = () => {
    downloadSharedFile(data);
  };

  return (
    <div className='flex size-full flex-col items-center justify-center'>
      <IconFile
        type={data.file.resolvedType}
        width=''
        height=''
        className='mb-4 h-2/5'
      />
      <div className='mb-2 text-2xl'>{data.file.displayName}</div>
      <div className='mb-4 text-center text-xl opacity-80'>
        <div className='flex justify-center gap-1'>
          <span>{t('modal.form.type')}:</span>
          <span className='first-letter:uppercase'>
            {tResolvedType(data.file.resolvedType)}
          </span>
        </div>
        <div>
          {t('modal.form.size')}: {prettyBytes(data.file.size, { locale })}
        </div>
      </div>
      <Button onClick={clickHandler} size='lg'>
        {t('contextMenu.download')}
      </Button>
    </div>
  );
};

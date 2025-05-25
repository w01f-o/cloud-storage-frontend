'use client';

import { Button, IconFile } from '@/_shared/ui';
import { useLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';
import { useOneSharedFilePage } from '../model/hooks/use-one-shared-file-page';

export const OneSharedFilePage: FC = () => {
  const t = useTranslations('FileItem');
  const locale = useLocale();
  const tResolvedType = useTranslations('resolvedFileType');
  const { sharedFile, download } = useOneSharedFilePage();

  if (!sharedFile) notFound();

  const { resolvedType, displayName, size } = sharedFile;

  return (
    <div className='flex size-full flex-col items-center justify-center'>
      <IconFile type={resolvedType} width='' height='' className='mb-4 h-2/5' />
      <div className='mb-2 text-2xl'>{displayName}</div>
      <div className='mb-4 text-center text-xl opacity-80'>
        <div className='flex justify-center gap-1'>
          <span>{t('modal.form.type')}:</span>
          <span className='first-letter:uppercase'>
            {tResolvedType(resolvedType)}
          </span>
        </div>
        <div>
          {t('modal.form.size')}: {prettyBytes(size, { locale })}
        </div>
      </div>
      <Button onClick={download} size='lg'>
        {t('contextMenu.download')}
      </Button>
    </div>
  );
};

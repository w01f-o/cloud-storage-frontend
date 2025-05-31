import { getFileColor } from '@/_entities/file';
import { StorageFile } from '@/_entities/storage/model/types/storage.type';
import { Progress } from '@/_shared/ui/progress';
import { useLocale, useTranslations } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';

interface FileDistributionItemProps {
  item: StorageFile;
  used: bigint;
}

export const FileDistributionItem: FC<FileDistributionItemProps> = ({
  item: { resolvedType, size },
  used,
}) => {
  const convertToMb = (size: bigint) => Number(size / 1024n / 1024n);
  const locale = useLocale();
  const t = useTranslations('resolvedFileType.plural');

  return (
    <div className='flex items-center justify-between gap-6'>
      <div className='flex items-center gap-3'>
        <i
          className='size-2 rounded-full'
          style={{ background: getFileColor(resolvedType) }}
        ></i>
        <div>
          <div className='text-lg'>{t(resolvedType)}</div>
          <div className='opacity-70'>{prettyBytes(size, { locale })}</div>
        </div>
      </div>
      <Progress
        value={(convertToMb(size) / convertToMb(used)) * 100}
        dir='rtl'
        color={getFileColor(resolvedType)}
        className='max-w-[420px]'
      />
    </div>
  );
};

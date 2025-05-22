import { File, getDownloadFileLink, getFileColor } from '@/_entities/file';
import { IconFile } from '@/_shared/ui';
import { useLocale } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC, Ref } from 'react';
import { useFormatter } from 'use-intl';

interface FileCardProps {
  file: File;
  ref?: Ref<HTMLButtonElement>;
}

export const FileCard: FC<FileCardProps> = ({
  file: { createdAt, id, displayName, originalName, resolvedType, size },
  ref,
}) => {
  const locale = useLocale();
  const format = useFormatter();

  const formattedCreatedAt = format.dateTime(createdAt, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const downloadClickHandler = () => {
    const link = document.createElement('a');
    link.href = getDownloadFileLink(id);
    link.download = originalName;
    link.click();
  };

  return (
    <button
      className='flex w-full items-center justify-between gap-5 text-start'
      onClick={downloadClickHandler}
      ref={ref}
    >
      <div
        className='grid size-12 place-items-center rounded-full'
        style={{
          background: getFileColor(resolvedType, 0.1),
        }}
      >
        <IconFile type={resolvedType} />
      </div>
      <div className='flex-grow'>{displayName}</div>
      <div>
        <div className='text-lg'>{formattedCreatedAt}</div>
        <div className='text-end text-sm opacity-60'>
          {prettyBytes(size, { locale })}
        </div>
      </div>
    </button>
  );
};

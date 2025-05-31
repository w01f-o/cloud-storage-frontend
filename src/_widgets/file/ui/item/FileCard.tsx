import { downloadFile, File, getFileColor } from '@/_entities/file';
import { IconFile } from '@/_shared/ui';
import { useLocale } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC, Ref } from 'react';
import { useFormatter } from 'use-intl';

interface FileCardProps {
  file: File;
  ref?: Ref<HTMLButtonElement>;
}

export const FileCard: FC<FileCardProps> = ({ file, ref }) => {
  const { createdAt, displayName, resolvedType, size } = file;
  const locale = useLocale();
  const format = useFormatter();

  const formattedCreatedAt = format.dateTime(createdAt, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const downloadClickHandler = () => {
    downloadFile(file);
  };

  return (
    <button
      className='flex w-full items-center justify-between text-start md:gap-5'
      onClick={downloadClickHandler}
      ref={ref}
    >
      <div
        className='mr-3 grid size-12 shrink-0 place-items-center rounded-full md:mr-0'
        style={{
          background: getFileColor(resolvedType, 0.1),
        }}
      >
        <IconFile type={resolvedType} />
      </div>
      <div className='flex-grow truncate'>{displayName}</div>
      <div>
        <div className='hidden md:block md:text-lg'>{formattedCreatedAt}</div>
        <div className='min-w-14 text-end text-sm opacity-60'>
          {prettyBytes(size, { locale })}
        </div>
      </div>
    </button>
  );
};

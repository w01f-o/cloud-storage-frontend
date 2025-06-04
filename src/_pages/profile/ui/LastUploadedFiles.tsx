import { useFileList } from '@/_entities/file';
import { FileList } from '@/_widgets/file';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const LastUploadedFiles: FC = () => {
  const t = useTranslations('ProfilePage');
  const { data } = useFileList(
    {
      sortBy: 'createdAt',
      sortOrder: 'desc',
      perPage: 8,
    },
    { select: data => data.list }
  );

  return (
    <div className='w-full lg:w-1/2'>
      <h3 className='text-[1.625rem] font-semibold'>
        {t('lastUploadedFiles')}
      </h3>
      {!!data.length ? (
        <div className='py-4'>
          <FileList list={data} />
        </div>
      ) : (
        <div className='py-5'>{t('empty')}</div>
      )}
    </div>
  );
};

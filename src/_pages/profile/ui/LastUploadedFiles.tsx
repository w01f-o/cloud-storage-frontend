import { useFileList } from '@/_entities/file';
import { Heading } from '@/_shared/ui';
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
      <Heading as='h3'>{t('lastUploadedFiles')}</Heading>
      <div className='py-4'>
        <FileList list={data} />
      </div>
    </div>
  );
};

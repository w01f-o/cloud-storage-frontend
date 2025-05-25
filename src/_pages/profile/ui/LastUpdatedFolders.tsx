import { useFolderList } from '@/_entities/folder';
import { Heading } from '@/_shared/ui';
import { FolderList } from '@/_widgets/folder';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const LastUpdatedFolders: FC = () => {
  const t = useTranslations('ProfilePage');
  const { data } = useFolderList(
    {
      sortBy: 'updatedAt',
      sortOrder: 'desc',
      perPage: 12,
    },
    { select: data => data.list }
  );

  return (
    <div className='w-full lg:w-1/2'>
      <Heading as='h3'>{t('lastUpdatedFolders')}</Heading>
      <div className='py-4'>
        <FolderList
          folders={data}
          className='grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3'
        />
      </div>
    </div>
  );
};

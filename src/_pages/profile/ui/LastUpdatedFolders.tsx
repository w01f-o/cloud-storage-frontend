import { useFolderList } from '@/_entities/folder';
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
      <h3 className='text-[1.625rem] font-semibold'>
        {t('lastUpdatedFolders')}
      </h3>
      <div className='py-4'>
        <FolderList
          folders={data}
          className='grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3'
        />
      </div>
    </div>
  );
};

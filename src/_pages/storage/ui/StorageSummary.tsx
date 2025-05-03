import { useUserStorage } from '@/_entities/storage';
import { useTranslations } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';

export const StorageSummary: FC = () => {
  const {
    data: {
      space: { free, total, used },
    },
  } = useUserStorage();
  const t = useTranslations('StoragePage');

  return (
    <div className='text-center'>
      <div className='mb-2 text-2xl font-bold'>
        {t('available')}: <br />
        {prettyBytes(free)}
      </div>
      <div className='text-lg'>
        {t('capacity')} – {prettyBytes(total)}
      </div>
      <div className='text-lg'>
        {t('used')} – {prettyBytes(used)}
      </div>
    </div>
  );
};

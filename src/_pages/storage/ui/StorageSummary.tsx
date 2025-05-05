import { useUserStorage } from '@/_entities/storage';
import { useLocale, useTranslations } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';

export const StorageSummary: FC = () => {
  const {
    data: {
      space: { free, total, used },
    },
  } = useUserStorage();
  const locale = useLocale();
  const t = useTranslations('StoragePage');

  return (
    <div className='text-center'>
      <div className='mb-2 text-2xl font-bold'>
        {t('available')}: <br />
        {prettyBytes(free, { locale })}
      </div>
      <div className='text-lg'>
        {t('capacity')} – {prettyBytes(total, { locale })}
      </div>
      <div className='text-lg'>
        {t('used')} – {prettyBytes(used, { locale })}
      </div>
    </div>
  );
};

import { Heading } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const LastUpdatedFolders: FC = () => {
  const t = useTranslations('ProfilePage');

  return (
    <div className='w-1/2'>
      <Heading as='h3'>{t('lastUpdatedFolders')}</Heading>
    </div>
  );
};

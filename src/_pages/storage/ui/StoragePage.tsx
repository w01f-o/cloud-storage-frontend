import { PageTitle } from '@/_shared/ui/page-title/PageTitle';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const StoragePage: FC = () => {
  const t = useTranslations('StoragePage');

  return (
    <>
      <PageTitle title={t('title')} />
    </>
  );
};

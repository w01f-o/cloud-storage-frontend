import { PageTitle } from '@/_shared/ui/page-title/PageTitle';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const ProfilePage: FC = () => {
  const t = useTranslations('ProfilePage');

  return (
    <>
      <PageTitle title={t('title')} />
    </>
  );
};

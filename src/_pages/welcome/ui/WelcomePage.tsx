import { PageTitle } from '@/_shared/ui/page-title/PageTitle';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const WelcomePage: FC = () => {
  const t = useTranslations('WelcomePage');

  return (
    <>
      <PageTitle title={t('title')} />
    </>
  );
};

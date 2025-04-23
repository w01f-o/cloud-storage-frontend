import { PageTitle } from '@/_shared/ui/page-title/PageTitle';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const SharedFilePage: FC = () => {
  const t = useTranslations('SharedFilePage');

  return (
    <>
      <PageTitle title={t('title')} />
    </>
  );
};

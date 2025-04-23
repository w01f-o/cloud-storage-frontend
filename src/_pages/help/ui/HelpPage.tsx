import { PageTitle } from '@/_shared/ui/page-title/PageTitle';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const HelpPage: FC = () => {
  const t = useTranslations('HelpPage');

  return (
    <>
      <PageTitle title={t('title')} />
    </>
  );
};

'use client';

import { NextPage } from 'next';
import { useTranslations } from 'use-intl';

const NotFound: NextPage = () => {
  const t = useTranslations('NotFound');

  return (
    <div className='flex h-[90%] w-full flex-col items-center justify-center'>
      <div className='text-8xl'>{t('title')}</div>
      <div className='text-4xl'>{t('message')}</div>
    </div>
  );
};

export default NotFound;

'use client';

import { Link } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Button, IconFullLogo } from '@/_shared/ui';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Background } from './Background';

export const WelcomePage: FC = () => {
  const t = useTranslations('WelcomePage');

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-3.5'>
      <Background />
      <motion.div
        className='flex flex-col items-center gap-3 text-center whitespace-pre-line'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', mass: 5, stiffness: 120, damping: 120 }}
      >
        <IconFullLogo />
        <h1 className='text-4xl'>{t('greeting')}</h1>
        <p className='text-lg'>{t('description')}</p>
      </motion.div>
      <div className='flex w-full max-w-sm justify-center gap-3'>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 50,
            mass: 2,
          }}
          className='flex-1'
        >
          <Button asChild isFullWidth endContent={<IconArrowRight />}>
            <Link href={RoutePaths.LOGIN}>{t('links.login')}</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 50,
            mass: 0.5,
          }}
          className='flex-2'
        >
          <Button asChild isFullWidth>
            <Link href={RoutePaths.REGISTER}>{t('links.register')}</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

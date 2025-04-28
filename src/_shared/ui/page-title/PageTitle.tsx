'use client';

import { usePathname } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const PageTitle: FC = () => {
  const t = useTranslations();
  const pathname = usePathname();

  if (pathname.startsWith(RoutePaths.SETTINGS)) {
    const tab = pathname.split('/').pop();
    switch (tab) {
      case 'general':
        return (
          <h1 className='pr-4 text-4xl font-bold'>
            {t('Navbar.settingsGeneral')}
          </h1>
        );
      case 'account':
        return (
          <h1 className='pr-4 text-4xl font-bold'>
            {t('Navbar.settingsAccount')}
          </h1>
        );
      case 'appearance':
        return (
          <h1 className='pr-4 text-4xl font-bold'>
            {t('Navbar.settingsAppearance')}
          </h1>
        );
      default:
        return null;
    }
  }

  const titleName = RouterConfig.getNavBarRoutes().find(
    route => route.path === pathname
  )?.name;

  if (!titleName) return null;

  return (
    <h1 className='pr-4 text-4xl font-bold'>{t(`Navbar.${titleName}`)}</h1>
  );
};

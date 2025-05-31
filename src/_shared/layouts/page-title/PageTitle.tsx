'use client';

import { usePathname } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const PageTitle: FC = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const title = (() => {
    if (pathname.startsWith(RoutePaths.FOLDER)) return null;

    if (pathname.startsWith(RoutePaths.SETTINGS)) {
      const tab = pathname.split('/').pop();
      switch (tab) {
        case 'general':
          return t('Navbar.settingsGeneral');
        case 'account':
          return t('Navbar.settingsAccount');
        case 'appearance':
          return t('Navbar.settingsAppearance');
        default:
          break;
      }
    } else {
      const titleName = RouterConfig.getNavBarRoutes().find(
        route => route.path === pathname
      )?.name;

      if (!titleName) return null;

      return t(`Navbar.${titleName}`);
    }
  })();

  return (
    title && (
      <h1 className='max-w-2xs px-8 pb-4 text-3xl font-bold md:max-w-full md:px-12 md:text-4xl'>
        {title}
      </h1>
    )
  );
};

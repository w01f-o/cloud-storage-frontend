'use client';

import { usePathname } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { useTranslations } from 'next-intl';
import { FC, HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

export const PageTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  const t = useTranslations();
  const pathname = usePathname();

  const title = (() => {
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

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      return t(`Navbar.${titleName}`);
    }
  })();

  return (
    <h1 className={tv({ base: 'text-4xl font-bold' })({ className })}>
      {title}
    </h1>
  );
};

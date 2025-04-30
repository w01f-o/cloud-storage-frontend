'use client';

import { useFolder } from '@/_entities/folder';
import { usePathname } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

export const PageTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  const t = useTranslations();
  const pathname = usePathname();
  const params = useParams<{ id: string | undefined }>();
  const { data: folderName } = useFolder(
    { id: params.id! },
    {
      enabled: !!params.id && !!pathname.startsWith(RoutePaths.FOLDER),
      select: data => data.name,
    }
  );

  const title = (() => {
    if (pathname.startsWith(RoutePaths.FOLDER)) {
      return folderName;
    }

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
    !!title && (
      <h1
        className={tv({ base: 'text-4xl font-bold' })({ className })}
        {...props}
      >
        {title}
      </h1>
    )
  );
};

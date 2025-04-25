'use client';

import { useSession } from '@/_entities/auth';
import { redirect, usePathname } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { useLocale } from 'next-intl';
import { FC, PropsWithChildren, useEffect } from 'react';

export const ProtectedRoutesProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { isAuth } = useSession();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    if (
      isAuth &&
      RouterConfig.getAuthPaths().includes(pathname as RoutePaths)
    ) {
      return redirect({ href: RoutePaths.HOME, locale });
    }

    if (RouterConfig.getProtectedPaths().includes(pathname as RoutePaths)) {
      return redirect({ href: RoutePaths.WELCOME, locale });
    }
  }, [isAuth, locale, pathname]);

  return children;
};

'use client';

import { useSession } from '@/_entities/auth';
import { usePathname, useRouter } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { useLocale } from 'next-intl';
import { FC, PropsWithChildren, useLayoutEffect } from 'react';

export const RequireConfirmed: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const user = useSession();
  const locale = useLocale();
  const router = useRouter();

  useLayoutEffect(() => {
    if (
      !user?.isConfirmed &&
      RouterConfig.getProtectedPaths().includes(pathname as RoutePaths)
    ) {
      router.push(RoutePaths.ACTIVATE);
    }
  }, [locale, pathname, router, user]);

  return children;
};

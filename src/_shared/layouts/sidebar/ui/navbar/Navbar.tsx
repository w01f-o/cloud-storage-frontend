'use client';

import { usePathname } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { FadeInOut } from '@/_shared/ui';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useActiveIndicator } from '../../model/hooks/use-active-indicator';
import { NavItem } from './NavItem';

export const Navbar: FC = () => {
  const t = useTranslations('Navbar');

  const pathname = usePathname();
  const { activeElementRef, activeIndicatorStyles, isDisableAnimation } =
    useActiveIndicator({
      pathname,
    });

  return (
    <nav>
      <FadeInOut isVisible={!!activeIndicatorStyles}>
        <div
          className={clsx('bg-primary absolute w-1', {
            'transition-[top]': !isDisableAnimation,
          })}
          style={{
            top: activeIndicatorStyles?.top ?? 0,
            height: activeIndicatorStyles?.height,
            left: 0,
          }}
        ></div>
      </FadeInOut>
      <ul className='flex flex-col gap-2 pr-4 pl-2.5'>
        {RouterConfig.getNavBarRoutes().map(route => {
          const isActive =
            pathname === route.path ||
            (route.path.startsWith(RoutePaths.SETTINGS_GENERAL) &&
              pathname.startsWith(RoutePaths.SETTINGS));

          return (
            route.isVisibleInNavbar && (
              <NavItem
                path={route.path}
                title={t(route.name)}
                key={route.path}
                ref={isActive ? activeElementRef : undefined}
                isActive={isActive}
              />
            )
          );
        })}
      </ul>
    </nav>
  );
};

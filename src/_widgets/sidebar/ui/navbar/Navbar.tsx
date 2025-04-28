'use client';

import { usePathname } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { NavItem } from './NavItem';
import { useActiveIndicator } from './useActiveIndicator';

export const Navbar: FC = () => {
  const t = useTranslations('Navbar');

  const pathname = usePathname();
  const { activeElementRef, activeIndicatorStyles, isDisableAnimation } =
    useActiveIndicator({
      pathname,
    });

  return (
    <nav>
      {activeIndicatorStyles && (
        <div
          className={clsx('bg-primary absolute w-1', {
            'transition-[top]': !isDisableAnimation,
          })}
          style={{
            top: activeIndicatorStyles.top ?? 0,
            height: activeIndicatorStyles.height,
          }}
        ></div>
      )}
      <ul className='flex flex-col gap-2 pr-4 pl-2.5'>
        {RouterConfig.getNavBarRoutes().map(route => {
          const isSettingsActive =
            route.path === RoutePaths.SETTINGS &&
            pathname.startsWith(RoutePaths.SETTINGS);

          if (isSettingsActive) {
            return (
              <NavItem
                path={route.path}
                title={t(route.name)}
                key={route.path}
                ref={activeElementRef}
                isActive
              />
            );
          }

          const isActive = pathname === route.path;

          return (
            <NavItem
              path={route.path}
              title={t(route.name)}
              key={route.path}
              ref={isActive ? activeElementRef : undefined}
              isActive={isActive}
            />
          );
        })}
      </ul>
    </nav>
  );
};

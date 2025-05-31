import { Link } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Button } from '@/_shared/ui';
import clsx from 'clsx';
import { FC, memo, Ref } from 'react';

interface NavItemProps {
  path: RoutePaths;
  title: string;
  ref?: Ref<HTMLLIElement>;
  isActive?: boolean;
}

export const NavItem: FC<NavItemProps> = memo(
  ({ path, title, ref, isActive }) => {
    return (
      <li ref={ref}>
        <Button
          asChild
          isFullWidth
          variant='ghost'
          color='default'
          size='lg'
          disableRipple
          disableAnimation
          className={clsx('justify-start', isActive && 'font-bold')}
        >
          <Link href={path}>{title}</Link>
        </Button>
      </li>
    );
  }
);
NavItem.displayName = 'NavItem';

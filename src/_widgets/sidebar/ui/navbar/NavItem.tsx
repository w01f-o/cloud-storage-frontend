import { Link } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Button } from '@/_shared/ui';
import clsx from 'clsx';
import { FC, Ref } from 'react';

interface NavItemProps {
  path: RoutePaths;
  title: string;
  ref?: Ref<HTMLLIElement>;
  isActive?: boolean;
}

export const NavItem: FC<NavItemProps> = ({ path, title, ref, isActive }) => {
  return (
    <li ref={ref}>
      <Button
        as={Link}
        href={path}
        isFullWidth
        variant='ghost'
        color='default'
        size='lg'
        disableRipple
        disableAnimation
        className={clsx('justify-start', isActive && 'font-bold')}
      >
        {title}
      </Button>
    </li>
  );
};

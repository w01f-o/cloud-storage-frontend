import { Link } from '@/_shared/i18n';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { ComponentPropsWithRef, FC, HTMLAttributes, Ref } from 'react';
import { Button } from '../button';
import {
  contentVariants,
  itemVariants,
  rootVariants,
} from './pagination.variants';

export const Pagination: FC<
  HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }
> = ({ className, ref, children, ...props }) => (
  <nav
    role='navigation'
    aria-label='pagination'
    ref={ref}
    className={rootVariants({
      className,
    })}
    {...props}
  >
    {children}
  </nav>
);

export const PaginationContent: FC<
  HTMLAttributes<HTMLUListElement> & { ref?: Ref<HTMLUListElement> }
> = ({ className, ref, children, ...props }) => (
  <ul ref={ref} className={contentVariants({ className })} {...props}>
    {children}
  </ul>
);

interface PaginationItemProps extends ComponentPropsWithRef<typeof Link> {
  isActive?: boolean;
  isDisabled?: boolean;
}

export const PaginationItem: FC<PaginationItemProps> = ({
  className,
  ref,
  children,
  isActive,
  ...props
}) => {
  return (
    <li>
      <Button asChild variant='ghost' isIconOnly disableRipple>
        <Link
          ref={ref}
          className={itemVariants({ className, isActive })}
          {...props}
        >
          {children}
        </Link>
      </Button>
    </li>
  );
};

export const PaginationPrevious: FC<PaginationItemProps> = ({
  className,
  isDisabled,
  ...props
}) => {
  if (isDisabled)
    return (
      <li>
        <Button variant='ghost' isIconOnly isDisabled className='opacity-30'>
          <IconChevronLeft />
        </Button>
      </li>
    );

  return (
    <PaginationItem className={className} {...props} isActive>
      <IconChevronLeft />
    </PaginationItem>
  );
};

export const PaginationNext: FC<PaginationItemProps> = ({
  className,
  isDisabled,
  ...props
}) => {
  if (isDisabled)
    return (
      <li>
        <Button variant='ghost' isIconOnly isDisabled className='opacity-30'>
          <IconChevronRight />
        </Button>
      </li>
    );

  return (
    <PaginationItem className={className} {...props} isActive>
      <IconChevronRight />
    </PaginationItem>
  );
};

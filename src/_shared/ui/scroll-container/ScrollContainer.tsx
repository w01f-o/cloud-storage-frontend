import { FC, HTMLAttributes, ReactNode, Ref } from 'react';
import { scrollContainerVariants } from './scroll-container.variants';

interface ScrollContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const ScrollContainer: FC<ScrollContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={scrollContainerVariants({ className })} {...props}>
      {children}
    </div>
  );
};

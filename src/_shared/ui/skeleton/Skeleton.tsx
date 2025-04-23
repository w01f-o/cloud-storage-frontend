import { FC, forwardRef, ReactNode } from 'react';
import { HTMLMotionProps, motion, AnimatePresence } from 'motion/react';
import { skeletonVariants, skeletonWrapperVariants } from './skeleton.variants';

interface SkeletonProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  isLoaded?: boolean;
  wrapperClassName?: string;
  children?: ReactNode;
}

const Skeleton: FC<SkeletonProps> = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, wrapperClassName, isLoaded, ...props }, ref) => {
    return (
      <motion.div
        className={skeletonWrapperVariants({
          className: wrapperClassName,
        })}
      >
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              key='skeleton'
              className={skeletonVariants({ className })}
              ref={ref}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              {...props}
            />
          )}
        </AnimatePresence>
        {props.children}
      </motion.div>
    );
  }
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };

import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import { FC, ReactNode } from 'react';
import { skeletonVariants, skeletonWrapperVariants } from './skeleton.variants';

interface SkeletonProps extends HTMLMotionProps<'div'> {
  isLoaded?: boolean;
  wrapperClassName?: string;
  children?: ReactNode;
}

const Skeleton: FC<SkeletonProps> = ({
  className,
  wrapperClassName,
  ref,
  isLoaded,
  ...props
}) => {
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
};

export { Skeleton };

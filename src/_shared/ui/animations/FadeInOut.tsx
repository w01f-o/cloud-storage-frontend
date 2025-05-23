'use client';

import { AnimatePresence, motion } from 'motion/react';
import { FC, ReactNode } from 'react';

interface FadeInOutProps {
  isVisible: boolean;
  children: ReactNode;
  className?: string;
}

export const FadeInOut: FC<FadeInOutProps> = ({
  isVisible,
  children,
  className,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

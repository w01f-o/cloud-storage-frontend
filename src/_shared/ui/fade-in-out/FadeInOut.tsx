'use client';

import { AnimatePresence, motion } from 'motion/react';
import { FC, ReactNode } from 'react';

interface FadeInOutProps {
  isVisible: boolean;
  children: ReactNode;
}

export const FadeInOut: FC<FadeInOutProps> = ({ isVisible, children }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

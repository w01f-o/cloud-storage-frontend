'use client';

import { motion } from 'motion/react';
import { FC, PropsWithChildren } from 'react';

export const FadeIn: FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

import { IconCloud } from '@/_shared/ui';
import { MotionProps, motion } from 'motion/react';
import { CSSProperties, FC } from 'react';

type CloudConfig = {
  style: CSSProperties;
  motionProps: MotionProps;
};

const clouds: CloudConfig[] = [
  {
    style: { top: '10%', left: '5%' },
    motionProps: {
      initial: { opacity: 0, x: '-100%' },
      animate: { opacity: 1, x: 0 },
      transition: { type: 'spring', mass: 4, stiffness: 120, damping: 120 },
    },
  },
  {
    style: { top: '17%', left: '22%' },
    motionProps: {
      initial: { opacity: 0, y: '-100%' },
      animate: { opacity: 1, y: 0 },
      transition: { type: 'spring', mass: 6, stiffness: 120, damping: 120 },
    },
  },
  {
    style: { top: '12%', left: '42%' },
    motionProps: {
      initial: { opacity: 0, x: '-100%' },
      animate: { opacity: 1, x: 0 },
      transition: { type: 'spring', mass: 4, stiffness: 120, damping: 120 },
    },
  },
  {
    style: { top: '20%', right: '22%' },
    motionProps: {
      initial: { opacity: 0, x: '-100%' },
      animate: { opacity: 1, x: 0 },
      transition: { type: 'spring', mass: 4, stiffness: 120, damping: 120 },
    },
  },
  {
    style: { top: '5%', right: '5%' },
    motionProps: {
      initial: { opacity: 0, x: '100%' },
      animate: { opacity: 1, x: 0 },
      transition: { type: 'spring', mass: 5, stiffness: 120, damping: 120 },
    },
  },
];

export const Background: FC = () => {
  return (
    <>
      {clouds.map(({ style, motionProps }, index) => (
        <motion.div
          className='absolute hidden lg:block'
          key={index}
          style={style}
          {...motionProps}
        >
          <IconCloud />
        </motion.div>
      ))}
    </>
  );
};

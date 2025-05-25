'use client';

import { LogoutButton } from '@/_features/auth';
import { useDisclosure } from '@/_shared/lib';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { FC, useEffect } from 'react';
import { CurrentUser } from '../../sidebar/ui/current-user/CurrentUser';
import { Navbar } from '../../sidebar/ui/navbar/Navbar';

export const HamburgerMenu: FC = () => {
  const { isOpen, toggle, close } = useDisclosure();
  const pathname = usePathname();

  useEffect(() => {
    close();
  }, [close, pathname]);

  return (
    <div>
      <div className='fixed top-14 right-8 z-20'>
        <button
          className='grid size-9 grid-cols-2 place-items-center'
          onClick={toggle}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className='bg-secondary block size-2 rounded-2xl'
            />
          ))}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0 at 100% 0)' }}
            animate={{ clipPath: 'circle(120% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0 at 100% 0)' }}
            className='bg-content fixed inset-0 z-10'
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.4 },
            }}
          >
            <div className='flex h-full w-3/4 flex-col justify-between py-12 pl-2'>
              <CurrentUser />
              <Navbar />
              <LogoutButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

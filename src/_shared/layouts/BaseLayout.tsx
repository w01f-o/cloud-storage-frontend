import { MobileNavbar } from '@/_widgets/mobile-navbar/ui/MobileNavbar';
import { Sidebar } from '@/_widgets/sidebar';
import { FC, PropsWithChildren } from 'react';
import { DesktopOnly, MobileOnly } from '../ui';
import { ClientEffects } from './ClientEffects';

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ClientEffects />
      <DesktopOnly>
        <Sidebar />
      </DesktopOnly>
      <MobileOnly>
        <MobileNavbar />
      </MobileOnly>
      <main className='bg-background lg:bg-content lg:rounded-content relative h-full flex-grow overflow-hidden px-12 pt-16 pb-7 transition-colors'>
        {children}
      </main>
    </>
  );
};

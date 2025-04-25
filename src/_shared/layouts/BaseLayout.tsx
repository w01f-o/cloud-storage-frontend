import { AuthQueryKeys, getCurrentUser } from '@/_entities/auth';
import { MobileNavbar } from '@/_widgets/mobile-navbar/ui/MobileNavbar';
import { Sidebar } from '@/_widgets/sidebar';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { DesktopOnly, MobileOnly } from '../ui';
import { ClientEffects } from './ClientEffects';

export const BaseLayout: FC<PropsWithChildren> = async ({ children }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [AuthQueryKeys.CURRENT_SESSION],
    queryFn: ({ signal }) => getCurrentUser({ signal }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
};

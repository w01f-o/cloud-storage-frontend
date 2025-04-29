import { getSessionQueryOptions } from '@/_entities/auth';
import { MobileNavbar } from '@/_widgets/mobile-navbar/ui/MobileNavbar';
import { Sidebar } from '@/_widgets/sidebar';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { DesktopOnly, MobileOnly } from '../ui';
import { PageTitle } from '../ui/page-title/PageTitle';
import { ScrollContainer } from '../ui/scroll-container/ScrollContainer';
import { ClientEffects } from './ClientEffects';

export const BaseLayout: FC<PropsWithChildren> = async ({ children }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getSessionQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientEffects />
      <DesktopOnly>
        <Sidebar />
      </DesktopOnly>
      <MobileOnly>
        <MobileNavbar />
      </MobileOnly>
      <main className='bg-background lg:bg-content lg:rounded-content relative flex h-full flex-grow flex-col overflow-hidden pt-16 pb-7 pl-12 transition-colors'>
        <PageTitle />
        <ScrollContainer>
          <div className='size-full pr-8'>{children}</div>
        </ScrollContainer>
      </main>
    </HydrationBoundary>
  );
};

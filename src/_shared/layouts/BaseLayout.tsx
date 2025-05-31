import { getRefreshToken, getSessionQueryOptions } from '@/_entities/auth';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { DesktopOnly, MobileOnly, ScrollContainer } from '../ui';
import { ClientEffects } from './ClientEffects';
import { HamburgerMenu } from './hamburger-menu';
import { PageTitle } from './page-title/PageTitle';
import { Sidebar } from './sidebar';

export const BaseLayout: FC<PropsWithChildren> = async ({ children }) => {
  const queryClient = new QueryClient();

  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    await queryClient.prefetchQuery(getSessionQueryOptions());
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientEffects />
      <DesktopOnly>
        <Sidebar />
      </DesktopOnly>
      <MobileOnly>
        <HamburgerMenu />
      </MobileOnly>
      <main className='bg-background lg:bg-content lg:rounded-content relative flex h-full w-5/6 flex-grow flex-col overflow-hidden pt-14 pb-7 transition-colors md:pt-16'>
        <PageTitle />
        <ScrollContainer>
          <div className='size-full px-8 md:px-12'>{children}</div>
        </ScrollContainer>
      </main>
    </HydrationBoundary>
  );
};

import { FC, PropsWithChildren } from 'react';
import { isMobileDevice } from './is-mobile-device';

export const MobileOnly: FC<PropsWithChildren> = async ({ children }) => {
  const isMobile = await isMobileDevice();

  return isMobile ? children : null;
};

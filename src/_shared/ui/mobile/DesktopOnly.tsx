import { FC, PropsWithChildren } from 'react';
import { isMobileDevice } from './is-mobile-device';

export const DesktopOnly: FC<PropsWithChildren> = async ({ children }) => {
  const isMobile = await isMobileDevice();

  return isMobile ? null : children;
};

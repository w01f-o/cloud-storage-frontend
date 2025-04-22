'use client';

import Cookies from 'js-cookie';
import { useTheme } from 'next-themes';
import { FC, PropsWithChildren, useEffect } from 'react';

export const ThemeInCookieProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 365);

      Cookies.set('theme', theme, { expires });
    }
  }, [theme]);

  return children;
};

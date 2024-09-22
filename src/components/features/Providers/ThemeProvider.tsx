"use client";

import { FC, ReactNode, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const theme = useTheme();

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const mqlChangeHandler = (mql: MediaQueryList | MediaQueryListEvent) => {
      const cookieTheme = document.cookie.match(/theme=([^;]+)/)?.[1];

      if (cookieTheme) {
        theme.set(cookieTheme as "light" | "dark");

        return;
      }

      mql.matches ? theme.set("dark") : theme.set("light");
    };

    mqlChangeHandler(mql);

    mql.addEventListener("change", mqlChangeHandler);

    return () => {
      mql.removeEventListener("change", mqlChangeHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme.current;
    document.cookie = `theme=${theme.current}; path=/;`;
  }, [theme]);

  return children;
};

export default ThemeProvider;

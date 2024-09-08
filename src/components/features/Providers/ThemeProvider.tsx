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

    const toggleTheme = (mql: MediaQueryList | MediaQueryListEvent) => {
      const cookieTheme = document.cookie.match(/theme=([^;]+)/)?.[1];

      if (cookieTheme) {
        theme.set(cookieTheme as "light" | "dark");

        return;
      }

      mql.matches ? theme.set("dark") : theme.set("light");
    };
    toggleTheme(mql);

    mql.addEventListener("change", toggleTheme);

    return () => {
      mql.removeEventListener("change", toggleTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme.current;
    document.cookie = `theme=${theme.current}; path=/;`;
  }, [theme]);

  return children;
};

export default ThemeProvider;

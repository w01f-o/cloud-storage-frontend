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
      mql.matches ? theme.set("dark") : theme.set("light");
    };
    // toggleTheme(mql);

    mql.addEventListener("change", toggleTheme);

    return () => {
      mql.removeEventListener("change", toggleTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme.current;
  }, [theme]);

  return children;
};

export default ThemeProvider;

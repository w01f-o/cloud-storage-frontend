"use client";

import { FC, ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";

interface MediaQueryProps {
  children: ReactNode;
}

const MediaQuery: FC<MediaQueryProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <div>
      {JSON.stringify(theme.current)}
      {children}
    </div>
  );
};

export default MediaQuery;

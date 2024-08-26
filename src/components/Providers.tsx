"use client";

import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "@/redux/StoreProvider";
import RefreshTokensProvider from "@/services/auth/RefrestTokensProvider";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <RefreshTokensProvider>
        <StoreProvider>{children}</StoreProvider>
      </RefreshTokensProvider>
    </SessionProvider>
  );
};

export default Providers;

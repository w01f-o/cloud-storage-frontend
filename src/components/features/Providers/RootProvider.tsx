import { FC, ReactNode } from "react";
import StoreProvider from "@/redux/StoreProvider";
import ThemeProvider from "@/components/features/Providers/ThemeProvider";

interface ProvidersProps {
  children: ReactNode;
}

const RootProvider: FC<ProvidersProps> = ({ children }) => {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
};

export default RootProvider;

import { FC, ReactNode } from "react";
import StoreProvider from "@/redux/StoreProvider";

interface ProvidersProps {
  children: ReactNode;
}

const RootProvider: FC<ProvidersProps> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default RootProvider;

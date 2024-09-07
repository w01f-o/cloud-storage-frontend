import { FC, ReactNode } from "react";
import { isMobileDevice } from "@/actions/actions.utils";

interface MobileOnlyProps {
  children: ReactNode;
}

const MobileOnly: FC<MobileOnlyProps> = ({ children }) => {
  const isMobile = isMobileDevice();

  return isMobile ? children : null;
};

export default MobileOnly;

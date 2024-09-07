import { FC, ReactNode } from "react";
import { isMobileDevice } from "@/actions/actions.utils";

interface DesktopOnlyProps {
  children: ReactNode;
}

const DesktopOnly: FC<DesktopOnlyProps> = ({ children }) => {
  const isMobile = isMobileDevice();

  return isMobile ? null : children;
};

export default DesktopOnly;

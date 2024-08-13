"use client";

import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
  children: ReactNode;
}

const ReactPortal: FC<ReactPortalProps> = ({ children }) => {
  return createPortal(children, document.body);
};

export default ReactPortal;

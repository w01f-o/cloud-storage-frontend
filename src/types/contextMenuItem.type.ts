import { HTMLAttributeAnchorTarget } from "react";

export type ContextMenuItemType = {
  id: number;
  name: string;
  action?: () => void;
  link?: {
    href: string;
    target?: HTMLAttributeAnchorTarget;
  };
  isDanger?: boolean;
};

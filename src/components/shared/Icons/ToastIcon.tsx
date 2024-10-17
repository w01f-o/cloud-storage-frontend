import { FC } from "react";
import { Toast } from "@/types/toast.type";
import { Check, CircleX, Info, TriangleAlert } from "lucide-react";

interface ToastIconProps extends Pick<Toast, "type"> {}

const ToastIcon: FC<ToastIconProps> = ({ type }) => {
  switch (type) {
    case "success":
      return <Check />;

    case "info":
      return <Info />;

    case "error":
      return <CircleX />;

    case "warning":
      return <TriangleAlert />;

    default:
      return null;
  }
};

export default ToastIcon;

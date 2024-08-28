import { FC, SVGAttributes } from "react";
import { Utils } from "@/services/utils";

interface FolderIconProps extends SVGAttributes<HTMLOrSVGElement> {
  color: string;
}

const FolderIcon: FC<FolderIconProps> = ({ color, ...props }) => {
  return (
    <svg
      width="39"
      height="30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32.617.7H6.26C4.124.696 2.39 2.41 2.387 4.53c0 .172.01.344.034.515a.774.774 0 0 0 1.161.565 2.21 2.21 0 0 1 1.127-.296h5.52a2.337 2.337 0 0 1 2.205 1.566l.132.422a3.892 3.892 0 0 0 3.679 2.627h17.923c.407 0 .806.106 1.158.307.12.07.255.105.392.105a.772.772 0 0 0 .776-.769V4.545C36.494 2.422 34.758.7 32.617.7Z"
        fill={Utils.saturateColor(color, 0.05)}
      />
      <path
        d="M36.11 8.91a3.877 3.877 0 0 0-1.942-.52H16.245a2.337 2.337 0 0 1-2.205-1.565l-.132-.422a3.892 3.892 0 0 0-3.68-2.627H4.71a3.732 3.732 0 0 0-1.897.497A3.831 3.831 0 0 0 .833 7.62V26.08c0 2.124 1.736 3.846 3.876 3.846h29.459c2.14 0 3.876-1.722 3.876-3.846V12.236a3.814 3.814 0 0 0-1.933-3.326Z"
        fill={Utils.saturateColor(color, 0.1)}
      />
    </svg>
  );
};

export default FolderIcon;

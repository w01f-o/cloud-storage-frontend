import { FC, SVGAttributes } from "react";

interface SortIconProps extends SVGAttributes<HTMLOrSVGElement> {}

const SortIcon: FC<SortIconProps> = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 12.5V1m0 0L1 3.5M4 1l3 2.5M12 0v11.5m0 0L9 9m3 2.5L15 9"
        stroke="#22215B"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default SortIcon;

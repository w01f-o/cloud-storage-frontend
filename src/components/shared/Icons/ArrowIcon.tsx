import { FC, SVGAttributes } from "react";

interface ArrowIconProps extends SVGAttributes<HTMLOrSVGElement> {}

const ArrowIcon: FC<ArrowIconProps> = ({ ...props }) => {
  return (
    <svg
      width={16}
      height={8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 4h14m0 0-2.5-3M14 4l-2.5 3" stroke="#fff" strokeWidth="2" />
    </svg>
  );
};

export default ArrowIcon;

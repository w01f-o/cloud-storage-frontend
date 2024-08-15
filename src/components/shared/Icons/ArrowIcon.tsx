import { FC, SVGAttributes } from "react";

interface ArrowIconProps extends SVGAttributes<HTMLOrSVGElement> {
  width?: number;
  height?: number;
}

const ArrowIcon: FC<ArrowIconProps> = ({ width, height, ...props }) => {
  return (
    <svg
      width={width ?? 16}
      height={height ?? 8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 4h14m0 0-2.5-3M14 4l-2.5 3" stroke="#fff" strokeWidth="2" />
    </svg>
  );
};

export default ArrowIcon;

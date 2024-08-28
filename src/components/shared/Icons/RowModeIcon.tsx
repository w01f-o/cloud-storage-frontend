import { FC, SVGAttributes } from "react";

interface RowModeProps extends SVGAttributes<HTMLOrSVGElement> {
  width?: number;
  height?: number;
  isActive: boolean;
}

const RowModeIcon: FC<RowModeProps> = ({
  width,
  height,
  isActive,
  ...props
}) => {
  const fill = isActive ? "#22215B" : "#B0C0D0";

  return (
    <svg
      width={width ?? 25}
      height={height ?? 26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 .667h25v1.5H0v-1.5Zm0 11.666h25v1.5H0v-1.5ZM25 24H0v1.5h25V24Z"
        fill={fill}
      />
    </svg>
  );
};

export default RowModeIcon;

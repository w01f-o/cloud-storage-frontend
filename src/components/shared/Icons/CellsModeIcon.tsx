"use client";

import { FC, SVGAttributes } from "react";
import { useTheme } from "@/hooks/useTheme";

interface RowModeProps extends SVGAttributes<HTMLOrSVGElement> {
  width?: number;
  height?: number;
  isActive: boolean;
}

const RowMode: FC<RowModeProps> = ({ width, height, isActive, ...props }) => {
  const theme = useTheme();
  const activeColor = theme.current === "dark" ? "#B0C0D0" : "#22215B";
  const unActiveColor = theme.current === "dark" ? "#22215B" : "#B0C0D0";

  const stroke = isActive ? activeColor : unActiveColor;

  return (
    <svg
      width={width ?? 25}
      height={height ?? 25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path stroke={stroke} d="M.5.5h12.235v12.235H.5z" />
      <path stroke={stroke} d="M.5 12.265h12.235V24.5H.5z" />
      <path stroke={stroke} d="M12.265.5H24.5v12.235H12.265z" />
      <path stroke={stroke} d="M12.265 12.265H24.5V24.5H12.265z" />
    </svg>
  );
};

export default RowMode;

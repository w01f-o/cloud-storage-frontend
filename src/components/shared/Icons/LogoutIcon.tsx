import { FC, SVGAttributes } from "react";

interface LogoutIconProps extends SVGAttributes<HTMLOrSVGElement> {
  width?: number;
  height?: number;
  fill?: string;
}

const LogoutIcon: FC<LogoutIconProps> = ({ height, width, fill, ...props }) => {
  return (
    <svg
      width={width ?? 16}
      height={height ?? 18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.003 7.889a1.2 1.2 0 0 1-1.188-1.203V1.202A1.2 1.2 0 0 1 8.003 0c.667 0 1.188.528 1.188 1.202v5.484A1.2 1.2 0 0 1 8.003 7.89ZM4.44 5.484a1.23 1.23 0 0 0 .463-.938 1.183 1.183 0 0 0-1.941-.91 8.106 8.106 0 0 0-2.926 7.039c.376 3.9 3.534 7.009 7.388 7.302C12.089 18.33 16 14.575 16 9.912a8.11 8.11 0 0 0-2.984-6.305c-.754-.616-1.912-.058-1.912.939 0 .38.173.703.463.938a5.723 5.723 0 0 1 2.086 4.428c0 3.344-2.897 6.042-6.287 5.66-2.608-.293-4.694-2.434-4.954-5.073A5.764 5.764 0 0 1 4.44 5.484Z"
        fill={fill ?? "#1B1D28"}
      />
    </svg>
  );
};

export default LogoutIcon;

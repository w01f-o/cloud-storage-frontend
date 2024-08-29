import { FC, SVGAttributes } from "react";

interface TripleDotsIconProps extends SVGAttributes<HTMLOrSVGElement> {
  fill: string;
}

const TripleDotsIcon: FC<TripleDotsIconProps> = ({ fill, ...props }) => {
  return (
    <svg
      width="4"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.874 1.572c0 .864-.707 1.565-1.578 1.565-.872 0-1.578-.7-1.578-1.565S1.424.006 2.296.006c.871 0 1.578.701 1.578 1.566Zm0 6.262c0 .865-.707 1.566-1.578 1.566A1.572 1.572 0 0 1 .718 7.834c0-.864.706-1.565 1.578-1.565.871 0 1.578.7 1.578 1.565Zm-1.578 7.828c.871 0 1.578-.7 1.578-1.565s-.707-1.566-1.578-1.566c-.872 0-1.578.701-1.578 1.566 0 .864.706 1.565 1.578 1.565Z"
        fill={fill}
      />
    </svg>
  );
};

export default TripleDotsIcon;

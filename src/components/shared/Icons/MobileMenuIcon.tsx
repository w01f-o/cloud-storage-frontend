import { FC, SVGAttributes } from "react";

interface MobileMenuIconProps extends SVGAttributes<HTMLOrSVGElement> {}

const MobileMenuIcon: FC<MobileMenuIconProps> = ({ ...props }) => {
  return (
    <svg
      width="19"
      height="19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm13 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill="#22215B"
      />
    </svg>
  );
};

export default MobileMenuIcon;

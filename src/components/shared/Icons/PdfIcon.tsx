import { FC, SVGAttributes } from "react";

interface PdfIconProps extends SVGAttributes<HTMLOrSVGElement> {}

const PdfIcon: FC<PdfIconProps> = ({ ...props }) => {
  return (
    <svg
      width="23"
      height="28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity=".3"
        d="M19.257 6.384a2.807 2.807 0 0 1-1.95-.783 2.634 2.634 0 0 1-.809-1.89V0H4.17a3.66 3.66 0 0 0-2.545 1.022A3.434 3.434 0 0 0 .57 3.488v21.029c.001.924.381 1.81 1.056 2.463A3.66 3.66 0 0 0 4.17 28h14.8a3.66 3.66 0 0 0 2.544-1.02 3.435 3.435 0 0 0 1.056-2.463V6.384h-3.313Z"
        fill="#FF3E4C"
      />
      <path
        d="M22.57 6.384h-3.313a2.807 2.807 0 0 1-1.95-.783 2.634 2.634 0 0 1-.809-1.89V0l6.072 6.384ZM18.044 19.553H4.23a.51.51 0 0 1-.355-.142.479.479 0 0 1-.147-.344c0-.128.053-.252.147-.343a.51.51 0 0 1 .355-.142h13.813c.132 0 .26.052.354.142a.477.477 0 0 1-.163.792.513.513 0 0 1-.191.037ZM18.044 14.078H4.23a.51.51 0 0 1-.355-.142.478.478 0 0 1-.147-.343c0-.129.053-.253.147-.344a.51.51 0 0 1 .355-.142h13.813a.513.513 0 0 1 .354.142.485.485 0 0 1 .146.344.477.477 0 0 1-.146.343.509.509 0 0 1-.354.142ZM18.044 16.816H4.23a.51.51 0 0 1-.355-.143.479.479 0 0 1-.147-.344c0-.128.053-.252.147-.343a.51.51 0 0 1 .355-.141h13.813c.132 0 .26.05.354.142a.477.477 0 0 1-.163.792.513.513 0 0 1-.191.037ZM12.595 11.34H4.231a.51.51 0 0 1-.355-.142.479.479 0 0 1-.147-.343c0-.129.053-.252.147-.344a.51.51 0 0 1 .355-.142h8.364a.51.51 0 0 1 .354.143.478.478 0 0 1 .147.343.478.478 0 0 1-.147.343.51.51 0 0 1-.354.142ZM12.595 8.602H4.231a.51.51 0 0 1-.355-.142.479.479 0 0 1-.147-.343c0-.129.053-.252.147-.343a.51.51 0 0 1 .355-.143h8.364a.51.51 0 0 1 .354.143.478.478 0 0 1 .147.343.478.478 0 0 1-.147.343.51.51 0 0 1-.354.142ZM17.799 7.631h-2.366a.735.735 0 0 0-.746.724v2.291c0 .4.334.724.746.724H17.8a.735.735 0 0 0 .746-.723V8.354c0-.4-.334-.724-.746-.724Z"
        fill="#FF3E4C"
      />
    </svg>
  );
};

export default PdfIcon;

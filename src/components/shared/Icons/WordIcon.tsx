import { FC } from "react";

interface WordIconProps {}

const WordIcon: FC<WordIconProps> = ({}) => {
  return (
    <svg width="23" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity=".3"
        d="M19.397 6.383a2.807 2.807 0 0 1-1.95-.783 2.633 2.633 0 0 1-.809-1.89V0H4.312c-.473 0-.942.09-1.379.265a3.61 3.61 0 0 0-1.168.756c-.334.324-.6.708-.78 1.132A3.393 3.393 0 0 0 .71 3.488v21.024c0 .458.093.912.274 1.335.181.423.447.808.781 1.132.334.324.732.58 1.168.756.437.175.906.265 1.379.265h14.797c.473 0 .941-.09 1.378-.265a3.61 3.61 0 0 0 1.168-.756c.335-.324.6-.709.78-1.132.182-.423.275-.877.275-1.335V6.383h-3.313Z"
        fill="#0072FF"
      />
      <path
        d="M22.71 6.383h-3.313a2.807 2.807 0 0 1-1.95-.783 2.633 2.633 0 0 1-.809-1.89V0l6.072 6.383ZM18.184 10.852H4.37a.509.509 0 0 1-.354-.142.477.477 0 0 1 .162-.792.514.514 0 0 1 .192-.037h13.813a.51.51 0 0 1 .354.143.478.478 0 0 1 .147.343.478.478 0 0 1-.147.343.51.51 0 0 1-.354.142ZM18.184 13.751H4.37a.509.509 0 0 1-.354-.142.477.477 0 0 1 .162-.792.515.515 0 0 1 .192-.037h13.813a.51.51 0 0 1 .354.143.479.479 0 0 1 .147.343.478.478 0 0 1-.147.343.51.51 0 0 1-.354.142ZM18.184 16.65H4.37a.515.515 0 0 1-.355-.142.483.483 0 0 1-.146-.344c0-.128.053-.251.147-.342a.509.509 0 0 1 .354-.142h13.813a.51.51 0 0 1 .354.142c.094.09.147.214.147.342a.479.479 0 0 1-.146.344.51.51 0 0 1-.355.142ZM12.736 19.55H4.37a.515.515 0 0 1-.355-.143.484.484 0 0 1-.146-.343c0-.129.053-.252.147-.343a.509.509 0 0 1 .354-.142h8.364c.133 0 .26.051.354.142a.477.477 0 0 1-.162.792.515.515 0 0 1-.191.037Z"
        fill="#0072FF"
      />
    </svg>
  );
};

export default WordIcon;
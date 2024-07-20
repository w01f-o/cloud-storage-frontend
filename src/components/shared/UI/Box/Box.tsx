import { FC, HTMLAttributes } from "react";
import { Property } from "csstype";
import BorderRadius = Property.BorderRadius;

interface BoxProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  borderRadius: BorderRadius;
}

const Box: FC<BoxProps> = ({ borderRadius, ...props }) => {
  return <div style={{ borderRadius }} {...props}></div>;
};

export default Box;

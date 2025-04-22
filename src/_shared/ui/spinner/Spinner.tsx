import { FC } from 'react';
import { SpinnerCircular, SpinnerCircularProps } from 'spinners-react';

export const Spinner: FC<SpinnerCircularProps> = ({ size, ...props }) => {
  const sizes: Record<string, number> = {
    sm: 15,
    md: 20,
    lg: 30,
  };

  return (
    <SpinnerCircular
      size={sizes[size ?? 'md']}
      thickness={150}
      speed={100}
      color='var(--color-foreground)'
      secondaryColor='var(--color-background)'
      {...props}
    />
  );
};

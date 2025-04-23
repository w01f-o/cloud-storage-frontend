import { FC, HTMLAttributes } from 'react';

type IconFullLogoProps = HTMLAttributes<HTMLOrSVGElement>;

export const IconCloud: FC<IconFullLogoProps> = ({ ...props }) => {
  return (
    <svg
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      width={116}
      height={65}
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M95.38 24.382c-2.073 0-4.072.31-5.957.882C85.984 10.777 72.964 0 57.425 0 41.982 0 29.028 10.645 25.493 24.996a20.547 20.547 0 0 0-4.987-.614C9.181 24.382 0 33.564 0 44.89c0 11.326 9.18 20.507 20.506 20.507H52.41a33.147 33.147 0 0 0 10.03 0h32.94c11.324 0 20.505-9.181 20.505-20.507 0-11.325-9.181-20.507-20.506-20.507Z'
        fill='#DDEEFB'
      />
    </svg>
  );
};

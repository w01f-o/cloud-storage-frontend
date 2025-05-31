import { FC, HTMLAttributes } from 'react';
import { Image } from '../image';
import { avatarVariants } from './avatar.variants';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const AVATAR_FALLBACK: string = '/no-avatar.webp';

export const Avatar: FC<AvatarProps> = ({
  src,
  className,
  size = 'xs',
  ...props
}) => {
  const getSize = () => {
    const sizeMap: Record<string, number> = {
      xs: 48,
      sm: 96,
      md: 128,
      lg: 208,
      xl: 256,
    };

    return sizeMap[size];
  };

  return (
    <div className={avatarVariants({ className, size })} {...props}>
      <Image
        alt='Avatar'
        src={src ?? AVATAR_FALLBACK}
        width={getSize()}
        height={getSize()}
        fallbackSrc={AVATAR_FALLBACK}
      />
    </div>
  );
};

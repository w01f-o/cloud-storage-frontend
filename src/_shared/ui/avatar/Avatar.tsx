import { FC, HTMLAttributes } from 'react';
import { Image } from '../image';
import { avatarVariants } from './avatar.variants';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src: string | null;
  size: 'default' | 'large';
}

const AVATAR_FALLBACK: string = '/no-avatar.webp';

export const Avatar: FC<AvatarProps> = ({ src, className, size, ...props }) => {
  const getSize = () => (size === 'default' ? 50 : 256);

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

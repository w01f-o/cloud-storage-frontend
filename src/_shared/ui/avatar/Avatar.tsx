import { FC, HTMLAttributes } from 'react';
import { Image } from '../image';
import { avatarVariants } from './avatar.variants';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src: string | null;
}

const AVATAR_FALLBACK: string = '/no-avatar.webp';

export const Avatar: FC<AvatarProps> = ({ src, className, ...props }) => {
  return (
    <div className={avatarVariants({ className })} {...props}>
      <Image
        alt='Avatar'
        src={src ?? AVATAR_FALLBACK}
        width={50}
        height={50}
        fallbackSrc={AVATAR_FALLBACK}
      />
    </div>
  );
};

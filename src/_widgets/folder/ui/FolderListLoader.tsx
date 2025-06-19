import { Skeleton } from '@/_shared/ui';
import { FC } from 'react';
import { tv } from 'tailwind-variants';

interface FolderListLoader {
  length?: number;
  className?: string;
}

export const FolderListLoader: FC<FolderListLoader> = ({
  length = 35,
  className,
}) => {
  return (
    <div className={tv({ base: 'grid gap-5' })({ className })}>
      {Array.from({ length }).map((_, index) => (
        <Skeleton key={index} wrapperClassName='h-32 rounded-2xl' />
      ))}
    </div>
  );
};

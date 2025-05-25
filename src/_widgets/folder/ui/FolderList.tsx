import { Folder } from '@/_entities/folder';
import { FC, Ref } from 'react';
import { tv } from 'tailwind-variants';
import { FolderItem } from './item/FolderItem';

interface FolderListProps {
  folders: Folder[];
  cursorRef?: Ref<HTMLDivElement>;
  className?: string;
}

export const FolderList: FC<FolderListProps> = ({
  folders,
  cursorRef,
  className,
}) => {
  return (
    <div
      className={tv({
        base: 'grid gap-5',
      })({ className })}
    >
      {folders.map((folder, index) => {
        const isNearEnd = index === folders.length - 6;

        return (
          <FolderItem
            folder={folder}
            key={folder.id}
            ref={isNearEnd ? cursorRef : null}
          />
        );
      })}
    </div>
  );
};

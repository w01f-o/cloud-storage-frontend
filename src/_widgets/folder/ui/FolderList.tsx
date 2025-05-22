import { Folder } from '@/_entities/folder';
import clsx from 'clsx';
import { FC, Ref } from 'react';
import { FolderItem } from './item/FolderItem';

interface FolderListProps {
  folders: Folder[];
  cursorRef?: Ref<HTMLDivElement>;
  perRow?: 3 | 6;
}

export const FolderList: FC<FolderListProps> = ({
  folders,
  cursorRef,
  perRow = 6,
}) => {
  return (
    <div
      className={clsx('grid gap-5 py-4', {
        'grid-cols-3': perRow === 3,
        'grid-cols-6': perRow === 6,
      })}
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

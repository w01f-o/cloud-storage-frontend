import { Folder } from '@/_entities/folder';
import { FC, Ref } from 'react';
import { FolderItem } from './FolderItem';

interface FolderListProps {
  folders: Folder[];
  cursorRef?: Ref<HTMLDivElement>;
}

export const FolderList: FC<FolderListProps> = ({ folders, cursorRef }) => {
  return (
    <div className='grid grid-cols-6 gap-5 py-4'>
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

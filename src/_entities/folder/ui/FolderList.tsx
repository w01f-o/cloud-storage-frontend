import { FC } from 'react';
import { Folder } from '../model/types/folder.type';
import { FolderItem } from './FolderItem';

interface FolderListProps {
  folders: Folder[];
}

export const FolderList: FC<FolderListProps> = ({ folders }) => {
  return (
    <div className='grid grid-cols-6 gap-5 py-4'>
      {folders.map(folder => (
        <FolderItem folder={folder} key={folder.id} />
      ))}
    </div>
  );
};

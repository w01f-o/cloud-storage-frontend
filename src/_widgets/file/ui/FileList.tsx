import { File } from '@/_entities/file';
import { FC, Ref } from 'react';
import { FileItem } from './item/FileItem';

interface FileListProps {
  list: File[];
  cursorRef?: Ref<HTMLButtonElement>;
}

export const FileList: FC<FileListProps> = ({ list, cursorRef }) => {
  return (
    <div className='flex flex-col gap-6'>
      {list.map((file, index) => {
        const isNearEnd = index === list.length - 6;

        return (
          <FileItem
            item={file}
            key={file.id}
            ref={isNearEnd ? cursorRef : null}
          />
        );
      })}
    </div>
  );
};

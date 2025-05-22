import { File, getDownloadFileLink } from '@/_entities/file';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/_shared/ui';
import { FC, ReactNode } from 'react';

interface FileContextMenuProps {
  file: File;
  openProperties: () => void;
  openConfirmDelete: () => void;
  openShare: () => void;
  children: ReactNode;
}

export const FileContextMenu: FC<FileContextMenuProps> = ({
  file,
  openProperties,
  openConfirmDelete,
  openShare,
  children,
}) => {
  const downloadClickHandler = () => {
    const link = document.createElement('a');
    link.href = getDownloadFileLink(file.id);
    link.download = file.originalName;
    link.click();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={downloadClickHandler}>
          Download
        </ContextMenuItem>
        <ContextMenuItem onSelect={openShare}>Share</ContextMenuItem>
        <ContextMenuItem isDanger onSelect={openConfirmDelete}>
          Delete
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={openProperties}>Properties</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

import { File } from '@/_entities/file';
import { useDisclosure } from '@/_shared/lib';
import { FC, memo, Ref } from 'react';
import { FileCard } from './FileCard';
import { FileConfirmDeleteModal } from './FileConfirmDeleteModal';
import { FileContextMenu } from './FileContextMenu';
import { FilePropertiesModal } from './FilePropertiesModal';
import { FileShareModal } from './FileShareModal';

interface FileItemProps {
  item: File;
  ref?: Ref<HTMLButtonElement>;
}

export const FileItem: FC<FileItemProps> = memo(({ item, ref }) => {
  const {
    isOpen: isOpenProperties,
    toggle: toggleOpenProperties,
    open: openProperties,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirmDelete,
    toggle: toggleOpenConfirmDelete,
    open: openConfirmDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenShare,
    toggle: toggleOpenShare,
    open: openShare,
  } = useDisclosure();

  return (
    <>
      <FileContextMenu
        file={item}
        openProperties={openProperties}
        openConfirmDelete={openConfirmDelete}
        openShare={openShare}
      >
        <FileCard file={item} ref={ref} />
      </FileContextMenu>

      <FilePropertiesModal
        file={item}
        isOpen={isOpenProperties}
        onOpenChange={toggleOpenProperties}
      />
      <FileConfirmDeleteModal
        file={item}
        isOpen={isOpenConfirmDelete}
        onOpenChange={toggleOpenConfirmDelete}
      />
      <FileShareModal
        file={item}
        isOpen={isOpenShare}
        onOpenChange={toggleOpenShare}
      />
    </>
  );
});
FileItem.displayName = 'FileItem';

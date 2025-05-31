'use client';

import { Folder } from '@/_entities/folder';
import { useDisclosure } from '@/_shared/lib';
import { FC, memo, Ref } from 'react';
import { FolderCard } from './FolderCard';
import { FolderConfirmDeleteModal } from './FolderConfirmDeleteModal';
import { FolderContextMenu } from './FolderContextMenu';
import { FolderPropertiesModal } from './FolderPropertiesModal';

interface FolderItemProps {
  folder: Folder;
  ref?: Ref<HTMLDivElement>;
}

export const FolderItem: FC<FolderItemProps> = memo(({ folder, ref }) => {
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

  return (
    <>
      <FolderContextMenu
        folder={folder}
        onOpenProperties={openProperties}
        onDelete={openConfirmDelete}
      >
        <FolderCard folder={folder} ref={ref} />
      </FolderContextMenu>
      <FolderPropertiesModal
        isOpen={isOpenProperties}
        onOpenChange={toggleOpenProperties}
        folder={folder}
      />
      <FolderConfirmDeleteModal
        isOpen={isOpenConfirmDelete}
        onOpenChange={toggleOpenConfirmDelete}
        folder={folder}
      />
    </>
  );
});
FolderItem.displayName = 'FolderItem';

import { File } from '@/_entities/file';
import { downloadFile } from '@/_entities/file/api/requests';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/_shared/ui';
import { useTranslations } from 'next-intl';
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
    downloadFile(file);
  };
  const t = useTranslations('FileItem.contextMenu');

  return (
    <ContextMenu modal>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={downloadClickHandler}>
          {t('download')}
        </ContextMenuItem>
        <ContextMenuItem onSelect={openShare}>{t('share')}</ContextMenuItem>
        <ContextMenuItem isDanger onSelect={openConfirmDelete}>
          {t('delete')}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={openProperties}>
          {t('properties')}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

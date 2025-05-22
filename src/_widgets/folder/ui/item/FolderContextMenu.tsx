import { Folder } from '@/_entities/folder';
import { Link } from '@/_shared/i18n';
import { RouterConfig } from '@/_shared/router';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';

interface FolderContextMenuProps {
  folder: Folder;
  onOpenProperties: () => void;
  onDelete: () => void;
  children: ReactNode;
}

export const FolderContextMenu: FC<FolderContextMenuProps> = ({
  folder: { id },
  children,
  onDelete,
  onOpenProperties,
}) => {
  const t = useTranslations('FolderItem');

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem asChild>
          <Link href={RouterConfig.getFolderPath(id)}>
            {t('contextMenu.open')}
          </Link>
        </ContextMenuItem>
        <ContextMenuItem isDanger onSelect={onDelete}>
          {t('contextMenu.delete')}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={onOpenProperties}>
          {t('contextMenu.properties')}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

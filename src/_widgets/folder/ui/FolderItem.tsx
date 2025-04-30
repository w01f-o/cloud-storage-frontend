import { Folder } from '@/_entities/folder';
import { Link } from '@/_shared/i18n';
import { adjustSaturation } from '@/_shared/lib';
import { RouterConfig } from '@/_shared/router';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  IconFolder,
} from '@/_shared/ui';
import { useFormatter } from 'next-intl';
import { FC, memo, Ref } from 'react';

interface FolderItemProps {
  folder: Folder;
  ref?: Ref<HTMLDivElement>;
}

export const FolderItem: FC<FolderItemProps> = memo(
  ({ folder: { color, name, size, updatedAt, id }, ref }) => {
    const format = useFormatter();

    const formattedUpdatedAt = format.dateTime(updatedAt, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className='flex h-32 w-full flex-col rounded-2xl px-5 pt-6 pb-5 shadow-xs'
            style={{ background: color, color: adjustSaturation(color, 0.8) }}
            ref={ref}
          >
            <div className='flex flex-grow'>
              <IconFolder color={color} />
            </div>
            <Link
              href={RouterConfig.getFolderPath(id)}
              className='truncate text-[20px] leading-none font-semibold'
            >
              {name}
            </Link>
            <time className='text-sm'>{formattedUpdatedAt}</time>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem asChild>
            <Link href={RouterConfig.getFolderPath(id)}>Открыть</Link>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  }
);
FolderItem.displayName = 'FolderItem';

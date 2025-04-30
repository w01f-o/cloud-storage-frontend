import { Link } from '@/_shared/i18n';
import { adjustSaturation } from '@/_shared/lib';
import { RouterConfig } from '@/_shared/router';
import { IconFolder } from '@/_shared/ui';
import { IconDots } from '@tabler/icons-react';
import { useFormatter } from 'next-intl';
import { FC, memo } from 'react';
import { Folder } from '../model/types/folder.type';

interface FolderItemProps {
  folder: Folder;
}

export const FolderItem: FC<FolderItemProps> = memo(
  ({ folder: { color, name, size, updatedAt, id } }) => {
    const format = useFormatter();

    const formattedUpdatedAt = format.dateTime(updatedAt, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div
        className='relative flex h-32 w-full flex-col rounded-2xl px-5 pt-6 pb-5 shadow-xs'
        style={{ background: color, color: adjustSaturation(color, 0.8) }}
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
        <div className='absolute top-5 right-4 size-6 rotate-90'>
          <button>
            <IconDots />
          </button>
        </div>
      </div>
    );
  }
);
FolderItem.displayName = 'FolderItem';

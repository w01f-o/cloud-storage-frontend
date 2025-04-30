'use client';

import { Folder } from '@/_entities/folder';
import { Link } from '@/_shared/i18n';
import { adjustSaturation, useDisclosure } from '@/_shared/lib';
import { RouterConfig } from '@/_shared/router';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  IconFolder,
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/_shared/ui';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC, memo, Ref } from 'react';

interface FolderItemProps {
  folder: Folder;
  ref?: Ref<HTMLDivElement>;
}

export const FolderItem: FC<FolderItemProps> = memo(
  ({ folder: { color, name, size, updatedAt, id }, ref }) => {
    const t = useTranslations('FolderItem');
    const format = useFormatter();
    const locale = useLocale();

    const formattedUpdatedAt = format.dateTime(updatedAt, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const { toggle, isOpen, open } = useDisclosure();

    return (
      <>
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
              <Link href={RouterConfig.getFolderPath(id)}>
                {t('contextMenu.open')}
              </Link>
            </ContextMenuItem>
            <ContextMenuItem isDanger>
              {t('contextMenu.delete')}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={open}>
              {t('contextMenu.properties')}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <Modal open={isOpen} onOpenChange={toggle}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{t('modal.title')}</ModalTitle>
              <ModalDescription>{name}</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio deserunt obcaecati nam explicabo temporibus magni
                corporis rerum laborum possimus officia eveniet eos doloremque
                nobis, eligendi aspernatur eius praesentium aliquid ea!
              </div>
              <div>{prettyBytes(size, { locale })}</div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);
FolderItem.displayName = 'FolderItem';

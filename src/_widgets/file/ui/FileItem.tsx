import { File, getDownloadFileLink, getFileColor } from '@/_entities/file';
import { useDisclosure } from '@/_shared/lib';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  IconFile,
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/_shared/ui';
import { useFormatter, useLocale } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC, Ref } from 'react';

interface FileItemProps {
  item: File;
  ref?: Ref<HTMLButtonElement>;
}

export const FileItem: FC<FileItemProps> = ({
  item: { displayName, createdAt, id, resolvedType, size },
  ref,
}) => {
  const format = useFormatter();
  const locale = useLocale();

  const formattedCreatedAt = format.dateTime(createdAt, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const downloadClickHandler = () => {
    const link = document.createElement('a');
    link.href = getDownloadFileLink(id);
    link.download = displayName;
    link.click();
  };

  const { toggle, isOpen, open } = useDisclosure();

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <button
            className='flex items-center justify-between gap-5 text-start'
            ref={ref}
            onClick={downloadClickHandler}
          >
            <div
              className='grid size-12 place-items-center rounded-full'
              style={{
                background: getFileColor(resolvedType, 0.1),
              }}
            >
              <IconFile type={resolvedType} />
            </div>
            <div className='flex-grow'>{displayName}</div>
            <div>
              <div className='text-lg'>{formattedCreatedAt}</div>
              <div className='text-end text-sm opacity-60'>
                {prettyBytes(size, { locale })}
              </div>
            </div>
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={downloadClickHandler}>
            Download
          </ContextMenuItem>
          <ContextMenuItem isDanger>Delete</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={open}>Properties</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Modal open={isOpen} onOpenChange={toggle}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Properties</ModalTitle>
            <ModalDescription>{displayName}</ModalDescription>
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
};

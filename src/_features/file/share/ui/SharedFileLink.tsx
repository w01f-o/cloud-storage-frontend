import { SharedFile } from '@/_entities/shared-file';
import { RoutePaths } from '@/_shared/router';
import { Button } from '@/_shared/ui';
import { IconCopy } from '@tabler/icons-react';
import { FC } from 'react';

interface SharedFileLinkProps {
  id: SharedFile['id'];
}

export const SharedFileLink: FC<SharedFileLinkProps> = ({ id }) => {
  const link = `${location.origin}${RoutePaths.SHARED}/${id}`;

  const copyClickHandler = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className='flex items-center justify-between'>
      <a href={link} target='_blank'>
        {link}
      </a>
      <div>
        <Button
          isIconOnly
          color='secondary'
          size='sm'
          onClick={copyClickHandler}
        >
          <IconCopy />
        </Button>
      </div>
    </div>
  );
};

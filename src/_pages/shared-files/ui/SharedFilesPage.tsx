'use client';

import { useSharedFileList } from '@/_entities/shared-file/lib/hooks/useSharedFileList';
import { FileList } from '@/_widgets/file';
import { FC } from 'react';

export const SharedFilesPage: FC = () => {
  const { data } = useSharedFileList(
    {},
    { select: data => data.list.map(file => file.file) }
  );

  return (
    <div className='py-6'>
      <FileList list={data} />
    </div>
  );
};

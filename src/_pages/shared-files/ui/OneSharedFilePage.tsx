'use client';

import { getDownloadSharedFileLink } from '@/_entities/shared-file/api/requests';
import { useSharedFile } from '@/_entities/shared-file/lib/hooks/useSharedFile';
import { SharedFile } from '@/_entities/shared-file/model/types/shared-file.type';
import { Button } from '@/_shared/ui';
import { notFound, useParams } from 'next/navigation';
import { FC } from 'react';

export const OneSharedFilePage: FC = () => {
  const { id } = useParams<{ id: SharedFile['file']['id'] }>();
  const { data } = useSharedFile({ id });

  if (!data) notFound();

  const clickHandler = () => {
    const a = document.createElement('a');
    a.href = getDownloadSharedFileLink(data.file.id);
    a.download = data.file.originalName;
    a.click();
  };

  return (
    <>
      File: {data.file.displayName}
      <Button onClick={clickHandler}>Download</Button>
    </>
  );
};

import { useUserStorage } from '@/_entities/storage';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';

export const StorageSummary: FC = () => {
  const {
    data: {
      space: { free, total, used },
    },
  } = useUserStorage();

  return (
    <div className='text-center'>
      <div className='mb-2 text-2xl font-bold'>
        Доступно: <br />
        {prettyBytes(free)}
      </div>
      <div className='text-lg'>Всего – {prettyBytes(total)}</div>
      <div className='text-lg'>Использовано – {prettyBytes(used)}</div>
    </div>
  );
};

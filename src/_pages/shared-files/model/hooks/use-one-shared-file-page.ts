import {
  downloadSharedFile,
  SharedFile,
  useSharedFile,
} from '@/_entities/shared-file';
import { useParams } from 'next/navigation';

interface UseOneSharedFilePageReturn {
  sharedFile: SharedFile | null;
  download: () => void;
}

export const useOneSharedFilePage = (): UseOneSharedFilePageReturn => {
  const { id } = useParams<{ id: SharedFile['id'] }>();
  const { data } = useSharedFile({ id });

  const download = () => {
    if (!data) return;

    downloadSharedFile(data);
  };

  return {
    sharedFile: data,
    download,
  };
};

import { useSearchParams } from 'next/navigation';
import { FOLDERS_SEARCH_QUERY_KEY } from '../constants';

export const useFolderSearchValue = (): string => {
  const searchParams = useSearchParams();

  return searchParams.get(FOLDERS_SEARCH_QUERY_KEY) ?? '';
};

import { User } from '@/_entities/user';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getCurrentUser } from '../../api/requests';
import { AuthQueryKeys } from '../../model';

export const useSession = () => {
  const { data: user } = useQuery<User | null, AxiosError>({
    queryKey: [AuthQueryKeys.CURRENT_SESSION],
    queryFn: ({ signal }) => getCurrentUser({ signal }),
    retry: false,
    staleTime: 0,
    gcTime: Infinity,
  });

  return user;
};

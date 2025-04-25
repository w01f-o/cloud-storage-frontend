import { User } from '@/_entities/user';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getCurrentUser } from '../../api/service';
import { AuthQueryKeys } from '../../model';
import { useTokenStore } from '../stores/token-store';

type UseSessionReturn =
  | {
      isAuth: true;
      user: User;
    }
  | {
      isAuth: false;
      user: null;
    };

type UseSession = () => UseSessionReturn;

export const useSession: UseSession = () => {
  const { accessToken } = useTokenStore();

  const { data: user } = useQuery<User, AxiosError>({
    queryKey: [AuthQueryKeys.CURRENT_SESSION, accessToken],
    queryFn: ({ signal }) => getCurrentUser({ signal }),
    retry: false,
    enabled: accessToken !== null,
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000,
    gcTime: Infinity,
  });

  if (user) {
    return { isAuth: true, user };
  }

  return { isAuth: false, user: null };
};

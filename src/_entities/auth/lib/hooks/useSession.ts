import { User } from '@/_entities/user';
import { usePathname } from '@/_shared/i18n';
import { RoutePaths, RouterConfig } from '@/_shared/router';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getCurrentUser } from '../../api/requests';
import { AuthQueryKeys } from '../../model';

export const useSession = () => {
  const pathname = usePathname();

  const { data: user } = useQuery<User | null, AxiosError>({
    queryKey: [AuthQueryKeys.CURRENT_SESSION],
    queryFn: ({ signal }) => getCurrentUser({ signal }),
    retry: false,
    staleTime: 0,
    gcTime: Infinity,
    enabled: !RouterConfig.getNonProtectedPaths().includes(
      pathname as RoutePaths
    ),
  });

  return user as User | null;
};

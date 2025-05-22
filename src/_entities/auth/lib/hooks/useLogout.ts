import { useRouter } from '@/_shared/i18n';
import { MutationHookOptions } from '@/_shared/model';
import { RoutePaths } from '@/_shared/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logout } from '../../api/requests';
import { AuthQueryKeys } from '../../model';

export const useLogout = ({
  onSettled,
  onMutate,
  ...options
}: MutationHookOptions<void, void, AxiosError> = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, AxiosError>({
    mutationFn: logout,
    onMutate: variables => {
      router.prefetch(RoutePaths.WELCOME);

      onMutate?.(variables);
    },
    onSettled: async (data, error, variables, context) => {
      router.replace(RoutePaths.WELCOME);

      queryClient.setQueryData([AuthQueryKeys.CURRENT_SESSION], null);
      await queryClient.resetQueries({
        predicate: query =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] !== AuthQueryKeys.CURRENT_SESSION,
      });

      onSettled?.(data, error, variables, context);
    },
    ...options,
  });
};

import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logout } from '../../api/requests';
import { AuthQueryKeys } from '../../model';

export const useLogout = (
  options?: MutationHookOptions<void, void, AxiosError>
) => {
  const { onSuccess, ...rest } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError>({
    mutationFn: logout,
    onSuccess: async (data, variables, context) => {
      queryClient.setQueryData([AuthQueryKeys.CURRENT_SESSION], null);
      await queryClient.resetQueries({
        predicate: query =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] !== AuthQueryKeys.CURRENT_SESSION,
      });

      onSuccess?.(data, variables, context);
    },
    ...rest,
  });
};

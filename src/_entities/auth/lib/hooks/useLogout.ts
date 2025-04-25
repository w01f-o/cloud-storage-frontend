import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logout } from '../../api/service';

const useLogout = (options?: MutationHookOptions<void, AxiosError>) => {
  const { onSuccess, ...rest } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError>({
    mutationFn: logout,
    onSuccess: async (data, variables, context) => {
      await queryClient.resetQueries();

      onSuccess?.(data, variables, context);
    },
    ...rest,
  });
};

export { useLogout };

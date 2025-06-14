import { useUploadFileProgresses } from '@/_entities/file';
import { navigate } from '@/_shared/lib';
import { MutationHookOptions } from '@/_shared/model';
import { RoutePaths } from '@/_shared/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logout } from '../../api/requests';
import { AuthQueryKeys } from '../../model';

export const useLogout = ({
  onSuccess,
  onMutate,
  ...options
}: MutationHookOptions<void, void, AxiosError> = {}) => {
  const queryClient = useQueryClient();
  const abortAllUploads = useUploadFileProgresses(
    state => state.abortAllUploads
  );

  return useMutation<void, AxiosError>({
    mutationFn: logout,
    onMutate: variables => {
      abortAllUploads();

      onMutate?.(variables);
    },
    onSuccess: async (data, variables, context) => {
      navigate(RoutePaths.WELCOME);

      queryClient.setQueryData([AuthQueryKeys.CURRENT_SESSION], null);
      await queryClient.resetQueries({
        predicate: query =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] !== AuthQueryKeys.CURRENT_SESSION,
      });

      onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

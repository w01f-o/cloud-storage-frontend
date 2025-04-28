import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { login } from '../../api/requests';
import { AuthMutationKeys, AuthQueryKeys } from '../../model';
import { AuthResponse, LoginDto } from '../../model/types';

export const useLogin = (
  options?: MutationHookOptions<AuthResponse, LoginDto, AxiosError>
) => {
  const { onSuccess, ...rest } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, AxiosError, LoginDto>({
    mutationFn: login,
    mutationKey: [AuthMutationKeys.LOGIN],
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [AuthQueryKeys.CURRENT_SESSION],
      });

      onSuccess?.(data, variables, context);
    },
    ...rest,
  });
};

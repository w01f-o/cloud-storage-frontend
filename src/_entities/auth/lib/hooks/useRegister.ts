import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { register } from '../../api/requests';
import { AuthMutationKeys, AuthQueryKeys } from '../../model';
import { AuthResponse, RegisterDto } from '../../model/types';

const useRegister = (
  options?: MutationHookOptions<AuthResponse, AxiosError, RegisterDto>
) => {
  const { onSuccess, ...rest } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, AxiosError, RegisterDto>({
    mutationFn: register,
    mutationKey: [AuthMutationKeys.REGISTER],
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [AuthQueryKeys.CURRENT_SESSION],
      });

      onSuccess?.(data, variables, context);
    },
    ...rest,
  });
};

export { useRegister };

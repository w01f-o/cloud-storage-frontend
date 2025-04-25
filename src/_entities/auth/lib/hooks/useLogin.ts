import { MutationHookOptions } from '@/_shared/model';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authorize } from '../../api/service';
import { AuthMutationKeys, AuthType } from '../../model';
import { AuthResponse, LoginDto } from '../../model/types';

const useLogin = (
  options?: MutationHookOptions<AuthResponse, AxiosError, LoginDto>
) => {
  return useMutation<AuthResponse, AxiosError, LoginDto>({
    mutationFn: dto => authorize(AuthType.LOGIN, dto),
    mutationKey: [AuthMutationKeys.LOGIN],
    ...options,
  });
};

export { useLogin };

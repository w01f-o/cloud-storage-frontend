import { MutationHookOptions } from '@/_shared/model';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authorize } from '../../api/service';
import { AuthMutationKeys, AuthType } from '../../model';
import { AuthResponse, RegisterDto } from '../../model/types';

const useRegister = (
  options?: MutationHookOptions<AuthResponse, AxiosError, RegisterDto>
) => {
  return useMutation<AuthResponse, AxiosError, RegisterDto>({
    mutationFn: dto => authorize(AuthType.REGISTER, dto),
    mutationKey: [AuthMutationKeys.REGISTER],
    ...options,
  });
};

export { useRegister };

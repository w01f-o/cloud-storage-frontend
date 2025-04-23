import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authorize } from '../../api/service';
import { AuthMutationKeys, AuthType, LoginDto, RegisterDto } from '../../model';
import { AuthResponse } from '../../model/types';

interface UseAuthorizeBaseReturn {
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
}

interface UseAuthorizeLoginReturn extends UseAuthorizeBaseReturn {
  login: (dto: LoginDto) => void;
}

interface UseAuthorizeRegisterReturn extends UseAuthorizeBaseReturn {
  register: (dto: RegisterDto) => void;
}

function useAuthorize<T extends AuthType>(
  type: T
): T extends AuthType.LOGIN
  ? UseAuthorizeLoginReturn
  : UseAuthorizeRegisterReturn;

function useAuthorize(type: AuthType) {
  const {
    mutate: login,
    isPending: loginIsPending,
    isSuccess: loginIsSuccess,
  } = useMutation<AuthResponse, AxiosError, LoginDto>({
    mutationFn: dto => authorize(AuthType.LOGIN, dto),
    mutationKey: [AuthMutationKeys.LOGIN],
  });
  const {
    mutate: register,
    isPending: registerIsPending,
    isSuccess: registerIsSuccess,
  } = useMutation<AuthResponse, AxiosError, RegisterDto>({
    mutationFn: dto => authorize(AuthType.REGISTER, dto),
    mutationKey: [AuthMutationKeys.REGISTER],
  });

  if (type === AuthType.LOGIN)
    return {
      login,
      isPending: loginIsPending,
      isSuccess: loginIsSuccess,
    };

  return {
    register,
    isPending: registerIsPending,
    isSuccess: registerIsSuccess,
  };
}

export { useAuthorize };

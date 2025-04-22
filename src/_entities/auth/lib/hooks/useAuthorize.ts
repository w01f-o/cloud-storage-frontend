import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authorize } from '../../api/service';
import { LoginDto, RegisterDto } from '../../model';
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

function useAuthorize<T extends 'login' | 'register'>(
  type: T
): T extends 'login' ? UseAuthorizeLoginReturn : UseAuthorizeRegisterReturn;

function useAuthorize(type: 'login' | 'register') {
  const {
    mutate: login,
    isPending: loginIsPending,
    isSuccess: loginIsSuccess,
  } = useMutation<AuthResponse, AxiosError, LoginDto>({
    mutationFn: dto => authorize('login', dto),
  });
  const {
    mutate: register,
    isPending: registerIsPending,
    isSuccess: registerIsSuccess,
  } = useMutation<AuthResponse, AxiosError, RegisterDto>({
    mutationFn: dto => authorize('register', dto),
  });

  if (type === 'login')
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

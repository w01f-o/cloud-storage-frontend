import { useMutation } from '@tanstack/react-query';
import { authorize } from '../../api';
import { AuthDto } from '../../model';

interface UseAuthorizeBaseReturn {
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
}

interface UseAuthorizeLoginReturn extends UseAuthorizeBaseReturn {
  login: (dto: AuthDto) => void;
}

interface UseAuthorizeRegisterReturn extends UseAuthorizeBaseReturn {
  register: (dto: AuthDto) => void;
}

function useAuthorize<T extends 'login' | 'register'>(
  type: T
): T extends 'login' ? UseAuthorizeLoginReturn : UseAuthorizeRegisterReturn;

function useAuthorize(type: 'login' | 'register') {
  const {
    mutate: login,
    isPending: loginIsPending,
    isSuccess: loginIsSuccess,
  } = useMutation({
    mutationFn: (dto: AuthDto) => authorize('login', dto),
  });
  const {
    mutate: register,
    isPending: registerIsPending,
    isSuccess: registerIsSuccess,
  } = useMutation({
    mutationFn: (dto: AuthDto) => authorize('register', dto),
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

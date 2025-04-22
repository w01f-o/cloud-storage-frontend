import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../api/service';
import { AxiosError } from 'axios';

interface UseLogoutReturn {
  logout: () => void;
  isPending: boolean;
  isSuccess: boolean;
}

type UseLogout = () => UseLogoutReturn;

const useLogout: UseLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation<void, AxiosError>({
    mutationFn: logout,
    onSuccess: () => queryClient.resetQueries(),
  });

  return {
    logout: mutate,
    isPending,
    isSuccess,
  };
};

export { useLogout };

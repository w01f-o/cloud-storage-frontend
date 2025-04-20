import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../api';

interface UseLogoutReturn {
  logout: () => void;
  isPending: boolean;
  isSuccess: boolean;
}

type UseLogout = () => UseLogoutReturn;

const useLogout: UseLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
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

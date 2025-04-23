import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logout } from '../../api/service';

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError>({
    mutationFn: logout,
    onSuccess: () => queryClient.removeQueries(),
  });
};

export { useLogout };

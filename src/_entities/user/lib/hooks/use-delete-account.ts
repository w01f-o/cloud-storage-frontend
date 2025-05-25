import { useLogout } from '@/_entities/auth';
import { MutationHookOptions } from '@/_shared/model';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteUser } from '../../api/requests';
import { MutationUserKeys } from '../../model/enums/mutation-keys.enum';
import { User } from '../../model/types/user.type';

export const useDeleteAccount = ({
  onSuccess,
  ...options
}: MutationHookOptions<User, void, AxiosError> = {}) => {
  const { mutate: logout } = useLogout();

  return useMutation({
    mutationKey: [MutationUserKeys.DELETE],
    mutationFn: deleteUser,
    onSuccess: (data, variables, context) => {
      logout();

      onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

import { User } from '@/_entities/user';
import { fetchQueryOptionsFactory } from '@/_shared/lib/query';
import { getCurrentUser } from '../../api/requests';
import { AuthQueryKeys } from '../../model';

export const getSessionQueryOptions = fetchQueryOptionsFactory<User | null>({
  queryKey: [AuthQueryKeys.CURRENT_SESSION],
  queryFn: (_, { signal }) => getCurrentUser({ signal }),
});

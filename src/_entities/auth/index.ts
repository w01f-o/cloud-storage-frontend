export {
  authMiddleware,
  getAccessToken,
  getRefreshToken,
  useLogin,
  useLogout,
  useRegister,
  useSession,
} from './lib';

export { getCurrentUser, logout, refreshTokens } from './api/requests';
export { getSessionQueryOptions } from './config/query-options/get-session-query-options';
export { AuthErrors, AuthMutationKeys, AuthQueryKeys, AuthType } from './model';
export type { AuthResponse, LoginDto, RegisterDto } from './model';

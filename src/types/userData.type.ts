export interface UserData {
  id: string;
  email: string;
  name: string;
  image: string;
  isActivated: boolean;
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: number;
  refreshExpiresAt: number;
}

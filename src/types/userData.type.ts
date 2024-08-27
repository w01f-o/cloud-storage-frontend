export interface UserData {
  id: string;
  email: string;
  name: string;
  image: string;
  isActivated: boolean;
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
}

import { UserData } from "@/types/userData.type";

export interface AuthResponse {
  user: UserData;
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
}

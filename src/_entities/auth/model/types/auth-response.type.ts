export interface AuthResponse {
  accessToken: string;
  sessionId: string;
  user: {
    id: string;
    email: string;
    name: string;
    isActivated: boolean;
  };
}

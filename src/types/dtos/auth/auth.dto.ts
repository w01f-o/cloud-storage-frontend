export interface AuthDto {
  name: string;
  email: string;
  password: string;
}

export type AuthLoginDto = Omit<AuthDto, "name">;
export type AuthRegistrationDto = AuthDto;

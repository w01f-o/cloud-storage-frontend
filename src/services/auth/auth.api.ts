import { CloudStoreApi } from "@/services/index.api";
import { AuthResponse } from "@/types/authResponse.type";
import { AuthLoginDto } from "@/types/dtos/authLogin.dto";
import { AuthRegistrationDto } from "@/types/dtos/authRegistrationDto";

export class AuthApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/auth";

  public static async login(loginDto: AuthLoginDto) {
    return await this.fetchWithoutAuth<AuthResponse>(
      `${this.API_ENDPOINT}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(loginDto),
      },
    );
  }

  public static async register(registerDto: AuthRegistrationDto) {
    return await this.fetchWithoutAuth<AuthResponse>(
      `${this.API_ENDPOINT}/registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(registerDto),
      },
    );
  }

  public static async logout(token: string) {
    return await this.fetchWithoutAuth<{ token: string }>(
      `${this.API_ENDPOINT}/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ token }),
      },
    );
  }
}

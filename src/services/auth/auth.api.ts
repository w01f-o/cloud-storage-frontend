import { CloudStoreApi } from "@/services/index.api";
import { RegisterDto } from "@/types/dtos/register.dto";
import { SignInDto } from "@/types/dtos/signIn.dto";
import { AuthResponse } from "@/types/authResponse.type";

export class AuthApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/auth";

  public static async signIn(
    signInDto: SignInDto,
  ): Promise<{ data: AuthResponse; response: Response }> {
    return await this.fetchWithoutAuth<AuthResponse>(
      `${this.API_ENDPOINT}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInDto),
      },
    );
  }

  public static async register(
    registerDto: RegisterDto,
  ): Promise<{ data: AuthResponse; response: Response }> {
    return await this.fetchWithoutAuth<AuthResponse>(
      `${this.API_ENDPOINT}/registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDto),
      },
    );
  }

  public static async logout(
    token: string,
  ): Promise<{ data: any; response: Response }> {
    return await this.fetchWithoutAuth(`${this.API_ENDPOINT}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  }
}

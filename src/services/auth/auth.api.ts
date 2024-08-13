import { CloudStoreApi } from "@/services/index.api";

export class AuthApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/auth";

  public static async signIn(
    body: any,
  ): Promise<{ data: any; response: Response }> {
    return await this.fetchWithoutAuth(`${this.API_ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  public static async register(
    formData: FormData,
  ): Promise<{ data: any; response: Response }> {
    return await this.fetchWithoutAuth(`${this.API_ENDPOINT}/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
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

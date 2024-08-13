import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export class CloudStoreApi {
  protected static readonly API_BASE_URL: string = `http://${process.env.NEXT_PUBLIC_API_BASE_URL}`;
  protected static API_ENDPOINT: string;
  private static readonly COOKIE_ACCESS_TOKEN: string = "at";
  private static readonly COOKIE_REFRESH_TOKEN: string = "rt";

  protected static getAccessTokenFromCookie(
    cookieStore: ReadonlyRequestCookies,
  ): string {
    return cookieStore.get(this.COOKIE_ACCESS_TOKEN)?.value ?? "";
  }

  protected static getRefreshTokenFromCookie(
    cookieStore: ReadonlyRequestCookies,
  ): string {
    return cookieStore.get(this.COOKIE_REFRESH_TOKEN)?.value ?? "";
  }

  protected static async fetchWithAuth<T>(
    endpoint: string,
    token: string,
    options?: RequestInit,
  ): Promise<{ data: T; response: Response }> {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return { response, data };
  }

  protected static async fetchWithoutAuth<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<{ data: T; response: Response }> {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    return { response, data };
  }
}

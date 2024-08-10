import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export class CloudStoreApi {
  protected static readonly API_BASE_URL: string = `http://${process.env.NEXT_PUBLIC_API_BASE_URL}`;
  protected static API_ENDPOINT: string;
  private static readonly COOKIE_ACCESS_TOKEN: string = "at";
  private static readonly COOKIE_REFRESH_TOKEN: string = "rt";

  protected static getAccessTokenFromCookie(
    cookieStore: ReadonlyRequestCookies
  ): string {
    return cookieStore.get(this.COOKIE_ACCESS_TOKEN)?.value ?? "";
  }

  protected static getRefreshTokenFromCookie(
    cookieStore: ReadonlyRequestCookies
  ): string {
    return cookieStore.get(this.COOKIE_REFRESH_TOKEN)?.value ?? "";
  }

  protected static async fetchWithAuth<T>(
    url: string,
    cookieStore: ReadonlyRequestCookies,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.getAccessTokenFromCookie(cookieStore)}`,
      },
    });

    return await response.json();
  }

  protected static async fetchWithoutAuth<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(url, options);
    return await response.json();
  }
}

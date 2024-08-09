import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export class CloudStoreApi {
  static API_BASE_URL: string = `http://${process.env.NEXT_PUBLIC_API_BASE_URL}`;
  static API_ENDPOINT: string;

  protected static getAccessTokenFromCookie(
    cookieStore: ReadonlyRequestCookies
  ) {
    return cookieStore.get("at")?.value;
  }

  protected static getRefreshTokenFromCookie(
    cookieStore: ReadonlyRequestCookies
  ) {
    return cookieStore.get("rt")?.value;
  }

  protected static async fetchWithAuth(
    url: string,
    cookieStore: ReadonlyRequestCookies,
    options?: RequestInit
  ) {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.getAccessTokenFromCookie(cookieStore)}`,
      },
    });

    return await response.json();
  }

  protected static async fetchWithoutAuth(url: string, options?: RequestInit) {
    const response = await fetch(url, options);
    return await response.json();
  }
}

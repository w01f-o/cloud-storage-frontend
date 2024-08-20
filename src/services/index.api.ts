import { auth } from "@/services/auth/auth";

type FetchResponse<T> = { data: T; response: Response };

export class CloudStoreApi {
  private static readonly API_BASE_URL: string = process.env
    .NEXT_PUBLIC_API_BASE_URL as string;
  protected static API_ENDPOINT: string;

  private static async fetchWithAuth<T>(
    endpoint: string,
    token: string,
    options?: RequestInit,
  ): Promise<FetchResponse<T>> {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return { response, data };
  }

  private static async fetchWithoutAuth<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<FetchResponse<T>> {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    return { response, data };
  }

  protected static async fetch<T>(options: {
    withAuth: boolean;
    endpoint: string;
    fetchOptions?: RequestInit;
  }): Promise<FetchResponse<T>> {
    const session = await auth();
    const { withAuth, fetchOptions, endpoint } = options;

    if (withAuth && !session) {
      throw new Error("Unauthorized");
    }

    if (withAuth) {
      return await this.fetchWithAuth<T>(
        endpoint,
        session?.user.accessToken as string,
        fetchOptions,
      );
    } else {
      return await this.fetchWithoutAuth<T>(endpoint, fetchOptions);
    }
  }
}

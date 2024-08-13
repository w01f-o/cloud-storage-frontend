export class CloudStoreApi {
  protected static readonly API_BASE_URL: string = process.env
    .NEXT_PUBLIC_API_BASE_URL as string;
  protected static API_ENDPOINT: string;

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

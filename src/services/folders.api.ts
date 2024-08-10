import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { CloudStoreApi } from "./index.api";

export class FoldersApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = `${this.API_BASE_URL}/folder`;

  public static async getAll(cookieStore: ReadonlyRequestCookies) {
    return await this.fetchWithAuth(`${this.API_ENDPOINT}`, cookieStore);
  }

  public static async getById(cookieStore: ReadonlyRequestCookies) {}

  public static async create() {}

  public static async updateColor() {}

  public static async delete() {}
}

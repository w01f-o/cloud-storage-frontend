import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { CloudStoreApi } from "./index.api";

export class FoldersApi extends CloudStoreApi {
  static API_ENDPOINT: string = `${this.API_BASE_URL}/folder`;

  static async getAll(cookieStore: ReadonlyRequestCookies) {
    return await this.fetchWithAuth(`${this.API_ENDPOINT}`, cookieStore);
  }

  static async getById(cookieStore: ReadonlyRequestCookies) {}

  static async create() {}

  static async updateColor() {}

  static async delete() {}
}

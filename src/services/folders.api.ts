import { CloudStoreApi } from "./index.api";

export class FoldersApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/folder";

  public static async getAll(token: string) {
    return await this.fetchWithAuth(`${this.API_ENDPOINT}`, token);
  }

  public static async getById() {}

  public static async create() {}

  public static async updateColor() {}

  public static async delete() {}
}

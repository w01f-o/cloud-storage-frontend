import { CloudStoreApi } from "./index.api";

export class SharedFilesApi extends CloudStoreApi {
  static API_ENDPOINT: string = `${this.API_BASE_URL}/shared-file`;

  static async getSharedFile() {}

  static async deleteSharedFile() {}

  static async shareFile() {}
}

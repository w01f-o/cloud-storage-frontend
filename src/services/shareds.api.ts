import { CloudStoreApi } from "./index.api";

export class SharedFilesApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/shared-file";

  static async getSharedFile() {}

  static async deleteSharedFile() {}

  static async shareFile() {}
}

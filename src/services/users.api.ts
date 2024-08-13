import { CloudStoreApi } from "./index.api";

export class UserApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/user";

  static async getUser(id: string) {}

  static async updateEmail(id: string, email: string) {}

  static async updateName(id: string, name: string) {}

  static async updatePassword(id: string, password: string) {}

  static async updateAvatar(id: string) {}
}

import { UploadFileDto } from "@/types/dtos/uploadFile.dto";
import { CloudStoreApi } from "./index.api";

export class FilesApi extends CloudStoreApi {
  static API_ENDPOINT: string = `${this.API_BASE_URL}/file`;

  static async download(fileId: string) {}

  static async upload(uploadFileDto: UploadFileDto) {}

  static async delete(fileId: string) {}
}

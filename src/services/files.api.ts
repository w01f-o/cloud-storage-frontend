import { UploadFileDto } from "@/types/dtos/uploadFile.dto";
import { CloudStoreApi } from "./index.api";

export class FilesApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/file";

  static async download(fileId: string) {}

  static async upload(uploadFileDto: UploadFileDto) {}

  static async delete(fileId: string) {}
}

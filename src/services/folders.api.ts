import { CloudStoreApi } from "./index.api";
import { CreateFolderDto } from "@/types/dtos/createFolder.dto";
import { Folder } from "@/types/folder.type";

export class FoldersApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/folder";

  public static async getAll() {
    return await this.fetch<Folder[]>({
      endpoint: this.API_ENDPOINT,
      withAuth: true,
    });
  }

  public static async getById(id: string) {
    return await this.fetch<Folder>({
      endpoint: `${this.API_ENDPOINT}/${id}`,
      withAuth: true,
    });
  }

  public static async create(createFolderDto: CreateFolderDto) {
    return await this.fetch<Folder>({
      endpoint: this.API_ENDPOINT,
      withAuth: true,
      fetchOptions: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createFolderDto),
      },
    });
  }

  public static async changeColor(id: string, newColor: string) {
    return await this.fetch<Folder>({
      endpoint: `${this.API_ENDPOINT}/color/${id}`,
      withAuth: true,
      fetchOptions: {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newColor }),
      },
    });
  }

  public static async delete(id: string) {
    return await this.fetch<Folder>({
      endpoint: `${this.API_ENDPOINT}/${id}`,
      withAuth: true,
      fetchOptions: {
        method: "DELETE",
      },
    });
  }
}

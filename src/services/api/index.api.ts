import { auth } from "@/services/auth/auth";
import { Folder } from "@/types/folder.type";
import { File } from "@/types/file.type";
import { CreateFolderDto } from "@/types/dtos/createFolder.dto";
import { AuthLoginDto } from "@/types/dtos/authLogin.dto";
import { AuthResponse } from "@/types/authResponse.type";
import { AuthRegistrationDto } from "@/types/dtos/authRegistrationDto";
import { ApiErrors } from "@/enums/ApiErrors.enum";
import { QueryParams } from "@/types/queryParams.type";
import { UpdateFolderDto } from "@/types/dtos/updateFolderDto";
import { User } from "@/types/user.type";
import { Utils } from "@/services/utils";
import { UpdateFileDto } from "@/types/dtos/updateFile.dto";
import { Storage } from "@/types/storage.type";

export type FetchResponse<T> = { data: T; response: Response };

class CloudStoreApi {
  private static readonly API_BASE_URL: string = process.env
    .NEXT_PUBLIC_API_BASE_URL as string;
  protected static API_ENDPOINT: string;

  private static async fetchWithAuth<T>(
    endpoint: string,
    token: string,
    options?: RequestInit,
  ): Promise<FetchResponse<T>> {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.type === ApiErrors.EXPIRED_ACCESS_TOKEN) {
      await Utils.sleep(1000);
      return await this.fetchWithAuth<T>(endpoint, token, options);
    }

    return { response, data };
  }

  private static async fetchWithoutAuth<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<FetchResponse<T>> {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    return { response, data };
  }

  protected static async fetch<T>(options: {
    withAuth: boolean;
    endpoint: string;
    fetchOptions?: RequestInit;
  }): Promise<FetchResponse<T>> {
    const { withAuth, fetchOptions, endpoint } = options;

    if (withAuth) {
      const session = await auth();

      return await this.fetchWithAuth<T>(
        endpoint,
        session?.user.accessToken as string,
        {
          cache: "no-store",
          ...fetchOptions,
        },
      );
    } else {
      return await this.fetchWithoutAuth<T>(endpoint, {
        cache: "no-store",
        ...fetchOptions,
      });
    }
  }
}

export class FoldersApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/folder";

  public static async getAll(params: QueryParams) {
    const searchParams =
      params.search && new URLSearchParams({ search: params.search });

    return await this.fetch<Folder[]>({
      endpoint: `${this.API_ENDPOINT}${searchParams ? `?${searchParams}` : ""}`,
      withAuth: true,
    });
  }

  public static async getById(id: string) {
    return await this.fetch<Folder>({
      endpoint: `${this.API_ENDPOINT}/${id}`,
      withAuth: true,
    });
  }

  public static async getLastUpdated() {
    return await this.fetch<Folder[]>({
      endpoint: `${this.API_ENDPOINT}/last_updated`,
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

  public static async update(id: string, updateFolderDto: UpdateFolderDto) {
    return await this.fetch<Folder>({
      endpoint: `${this.API_ENDPOINT}/${id}`,
      withAuth: true,
      fetchOptions: {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateFolderDto),
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

export class AuthApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/auth";

  public static async login(loginDto: AuthLoginDto) {
    return await this.fetch<AuthResponse>({
      withAuth: false,
      endpoint: `${this.API_ENDPOINT}/login`,
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDto),
      },
    });
  }

  public static async register(registerDto: AuthRegistrationDto) {
    return await this.fetch<AuthResponse>({
      withAuth: false,
      endpoint: `${this.API_ENDPOINT}/registration`,
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDto),
      },
    });
  }

  public static async logout(token: string) {
    return await this.fetch<{ token: string }>({
      withAuth: false,
      endpoint: `${this.API_ENDPOINT}/logout`,
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      },
    });
  }

  public static async refresh(token: string) {
    return await this.fetch<AuthResponse>({
      withAuth: false,
      endpoint: `${this.API_ENDPOINT}/refresh`,
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      },
    });
  }
}

export class FilesApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/file";

  static async getAll(folderId: string) {
    const params = new URLSearchParams({ folder: folderId });

    return await this.fetch<File[]>({
      endpoint: `${this.API_ENDPOINT}?${params.toString()}`,
      withAuth: true,
    });
  }

  static async getLastUploaded() {
    return await this.fetch<File[]>({
      endpoint: `${this.API_ENDPOINT}/last_uploaded`,
      withAuth: true,
    });
  }

  static async download(fileId: string) {}

  static async upload(uploadFileData: FormData) {
    return this.fetch<File>({
      endpoint: `${this.API_ENDPOINT}`,
      withAuth: true,
      fetchOptions: {
        method: "POST",
        body: uploadFileData,
      },
    });
  }

  static async delete(fileId: string) {
    return await this.fetch<File>({
      endpoint: `${this.API_ENDPOINT}/${fileId}`,
      withAuth: true,
      fetchOptions: {
        method: "DELETE",
      },
    });
  }

  static async update(fileId: string, updateFileDto: UpdateFileDto) {
    return await this.fetch<File>({
      endpoint: `${this.API_ENDPOINT}/${fileId}`,
      withAuth: true,
      fetchOptions: {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateFileDto),
      },
    });
  }
}

export class SharedFilesApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/shared-file";

  static async getSharedFile() {}

  static async deleteSharedFile() {}

  static async shareFile() {}
}

export class UserApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/user";

  static async getUser() {
    return await this.fetch<User>({
      endpoint: this.API_ENDPOINT,
      withAuth: true,
    });
  }

  static async getStorage() {
    return await this.fetch<Storage>({
      endpoint: `${this.API_ENDPOINT}/storage`,
      withAuth: true,
    });
  }

  static async updateEmail(id: string, email: string) {}

  static async updateName(id: string, name: string) {}

  static async updatePassword(id: string, password: string) {}

  static async updateAvatar(id: string) {}
}

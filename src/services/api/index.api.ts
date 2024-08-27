import { auth } from "@/services/auth/auth";
import { Folder } from "@/types/folder.type";
import { CreateFolderDto } from "@/types/dtos/createFolder.dto";
import { AuthLoginDto } from "@/types/dtos/authLogin.dto";
import { AuthResponse } from "@/types/authResponse.type";
import { AuthRegistrationDto } from "@/types/dtos/authRegistrationDto";
import { UploadFileDto } from "@/types/dtos/uploadFile.dto";
import { ApiErrors } from "@/enums/ApiErrors.enum";

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
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.type === ApiErrors.EXPIRED_ACCESS_TOKEN) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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

      if (!session) {
        throw new Error("Unauthorized");
      }

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

  static async download(fileId: string) {}

  static async upload(uploadFileDto: UploadFileDto) {}

  static async delete(fileId: string) {}
}

export class SharedFilesApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/shared-file";

  static async getSharedFile() {}

  static async deleteSharedFile() {}

  static async shareFile() {}
}

export class UserApi extends CloudStoreApi {
  protected static API_ENDPOINT: string = "/user";

  static async getUser(id: string) {}

  static async updateEmail(id: string, email: string) {}

  static async updateName(id: string, name: string) {}

  static async updatePassword(id: string, password: string) {}

  static async updateAvatar(id: string) {}
}

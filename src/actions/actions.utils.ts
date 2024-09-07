import { CustomAuthError } from "@/services/auth/auth.error";
import { headers } from "next/headers";
import UAParser from "ua-parser-js";

export type ServerActionResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export class ServerActionError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "ServerActionError";
  }
}

export function createServerAction<Return, Args extends unknown[]>(
  callback: (...args: Args) => Promise<Return>,
): (...args: Args) => Promise<ServerActionResult<Return>> {
  return async (...args: Args) => {
    try {
      const value = await callback(...args);

      return { success: true, value };
    } catch (error) {
      if (
        error instanceof ServerActionError ||
        error instanceof CustomAuthError
      ) {
        return {
          success: false,
          error: error.message,
        };
      }

      throw error;
    }
  };
}

export const isMobileDevice = () => {
  if (typeof process === "undefined") {
    throw new Error(
      "[Server method] you are importing a server-only module outside of server",
    );
  }

  const { get } = headers();
  const ua = get("user-agent");

  const device = new UAParser(ua || "").getDevice();

  return device.type === "mobile";
};

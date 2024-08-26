import { type DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { AuthLoginDto } from "@/types/dtos/authLogin.dto";
import { AuthApi } from "@/services/auth/auth.api";
import { UserData } from "@/types/userData.type";
import { CustomAuthError } from "@/services/auth/auth.error";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
    } & DefaultSession["user"];
  }

  interface User extends UserData {}
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessExpiresAt: number;
    refreshExpiresAt: number;
  }
}

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const signInDto: AuthLoginDto = {
          email: credentials?.email as string,
          password: credentials?.password as string,
        };
        const { response, data } = await AuthApi.login(signInDto);

        if (response.ok && data) {
          const userData: UserData = {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };

          return userData;
        }

        throw new CustomAuthError(JSON.stringify(data));
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
    encode: async ({ secret: _, token }) => {
      return JSON.stringify(token);
    },
    decode: async ({ secret: _, token }) => {
      return JSON.parse(token as string);
    },
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessExpiresAt: Date.now() + 1000 * 10,
          refreshExpiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
        };
      } else if (Date.now() < token.accessExpiresAt) {
        console.log(trigger);
        return token;
      } else {
        return token;
      }
    },
    async session({ session, token, trigger }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.accessExpiresAt = token.accessExpiresAt as number;
      session.user.refreshExpiresAt = token.refreshExpiresAt as number;

      return session;
    },
  },
  logger: {
    error(error) {
      if (process.env.NODE_ENV === "development") {
        console.error(`[auth][error] ${error}`);
      }
    },
    warn(code) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[auth][warn] ${code}`);
      }
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.debug(`[auth][debug] ${code}:`, metadata);
      }
    },
  },
};

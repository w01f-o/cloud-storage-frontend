import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { AuthApi } from "@/services/auth/auth.api";
import { LoginDto } from "@/types/dtos/loginDto";
import { UserData } from "@/types/userData.type";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
    } & DefaultSession["user"];
  }

  interface User extends UserData {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
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
        const signInDto: LoginDto = {
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

        return null;
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
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;

      return session;
    },
  },
});
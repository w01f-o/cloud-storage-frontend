import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { AuthApi } from "@/services/auth/auth.api";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
    refreshToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const { response, data } = await AuthApi.signIn(credentials);

        if (response.ok && data) {
          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    encode: async ({ secret, token }) => {
      return JSON.stringify(token);
    },
    decode: async ({ secret, token }) => {
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

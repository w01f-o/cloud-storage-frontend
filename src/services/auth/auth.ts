import NextAuth from "next-auth";
import { authOptions } from "@/services/auth/auth.options";

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

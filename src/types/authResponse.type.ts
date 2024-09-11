import { AuthUser } from "@/types/entities/authUser.type";
import { Tokens } from "@/types/entities/tokens.type";

export interface AuthResponse {
  user: AuthUser;
  tokens: Tokens;
}

import { AuthFormDto } from "@/types/dtos/authForm.dto";

export type AuthLoginDto = Omit<AuthFormDto, "name">;

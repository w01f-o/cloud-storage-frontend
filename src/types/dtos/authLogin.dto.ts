import { AuthFormDto } from "@/types/dtos/authFormDto.type";

export type AuthLoginDto = Omit<AuthFormDto, "name">;

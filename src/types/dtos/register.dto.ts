import { DtoField } from "@/types/dtos/dtoField.type";

export interface RegisterDto {
  name: DtoField;
  email: DtoField;
  password: DtoField;
}
import { RootDictionary } from "@/types/dictionaries.type";
import { CredentialsSignin } from "next-auth";

export class CustomAuthError extends CredentialsSignin {
  message: keyof RootDictionary["errors"];

  public constructor(message: keyof RootDictionary["errors"]) {
    super();
    this.message = message;
  }
}

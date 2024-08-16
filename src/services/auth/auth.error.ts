import { CredentialsSignin } from "next-auth";

export class CustomAuthError extends CredentialsSignin {
  message: string;

  public constructor(message: string) {
    super();
    this.message = message;
  }
}

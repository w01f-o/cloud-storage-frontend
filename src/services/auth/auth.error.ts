import { CredentialsSignin } from "next-auth";

export class CustomAuthError extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

import { ErrorsEnum } from "@/types/apiErrors.enum";

export class Errors {
  public static generateError(message: ErrorsEnum) {
    switch (message) {
      case ErrorsEnum.MAILER_ERROR:
        return "Введён несуществующий email";
      case ErrorsEnum.USER_WITH_SUCH_EMAIL_ALREADY_EXISTS:
        return "Пользователь с таким email уже существует";
      case ErrorsEnum.USER_WITH_SUCH_EMAIL_NOT_FOUND:
        return "Пользователя с таким email не существует";
      case ErrorsEnum.WRONG_EMAIL_OR_PASSWORD:
        return "Неверный email или пароль";
      case ErrorsEnum.WRONG_ACTIVATION_CODE:
        return "Неверный код активации";
      case ErrorsEnum.USER_NOT_ACTIVATED:
        return "Пользователь не активирован";
      case ErrorsEnum.NO_REFRESH_TOKEN:
        return "No refresh token";
      case ErrorsEnum.NO_ACCESS_TOKEN:
        return "No access token";
      case ErrorsEnum.WRONG_REFRESH_TOKEN:
        return "Wrong refresh token";
      case ErrorsEnum.WRONG_ACCESS_TOKEN:
        return "Wrong access token";

      default:
        return "Неизвестная ошибка";
    }
  }
}

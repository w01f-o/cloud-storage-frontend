import { HttpStatus } from '../enums/http-status.enum';

export interface ApiError<T extends string> {
  message: T;
  statusCode: HttpStatus;
}

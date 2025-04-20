import { RegisterDto } from './register.dto';

export type LoginDto = Omit<RegisterDto, 'name'>;

export interface User {
  id: string;
  email: string;
  name: string;
  isConfirmed: boolean;
  avatar: string | null;
}

export type UpdateUserDto = Partial<
  Pick<User, 'name' | 'email'> & {
    password?: string;
    oldPassword?: string;
    avatar?: File;
  }
>;

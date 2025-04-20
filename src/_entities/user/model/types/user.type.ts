interface User {
  id: string;
  email: string;
  name: string;
  isConfirmed: boolean;
  avatar: string | null;
  banner: string | null;
}

type UpdateUserDto = Partial<
  Pick<User, 'name' | 'email'> & {
    password: string;
    avatar?: File;
  }
>;

export type { UpdateUserDto, User };

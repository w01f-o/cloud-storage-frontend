export interface Category {
  type: string;
  size: number;
}

export interface Space {
  used: number;
  free: number;
  total: number;
}

export interface Storage {
  category: Category[];
  space: Space;
}

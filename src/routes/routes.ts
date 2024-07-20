export class Route {
  private readonly _path: string;
  private readonly _name: string;

  public constructor(path: string, name: string) {
    this._path = path;
    this._name = name;
  }

  public get path(): string {
    return this._path;
  }

  get name(): string {
    return this._name;
  }
}

export const appRoutes = [
  new Route("/", "Главная"),
  new Route("/profile", "Профиль"),
  new Route("/storage", "Хранилище"),
  new Route("/shared", "Общие"),
  new Route("/settings", "Настройки"),
  new Route("/help", "Помощь"),
];

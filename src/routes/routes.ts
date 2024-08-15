export class Route {
  private readonly _path: string;
  private readonly _name: string;
  private readonly _inNavBar: boolean;

  public constructor(path: string, name: string, inNavBar?: boolean) {
    this._path = path;
    this._name = name;
    this._inNavBar = inNavBar ?? true;
  }

  public get path(): string {
    return this._path;
  }

  public get name(): string {
    return this._name;
  }

  get inNavBar(): boolean {
    return this._inNavBar;
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

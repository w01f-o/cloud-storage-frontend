export interface Route {
  path: string;
  name: string;
}

export const routes: Route[] = [
  { path: "/", name: "home" },
  { path: "/profile", name: "profile" },
  { path: "/storage", name: "storage" },
  { path: "/shared", name: "shared" },
  { path: "/settings", name: "settings" },
  { path: "/help", name: "help" },
];

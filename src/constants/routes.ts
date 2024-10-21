import { Route } from "@/types/route.type";
import { RoutePaths } from "@/enums/RoutePaths.enum";

export const routes: Route[] = [
  { path: RoutePaths.HOME, name: "home" },
  { path: RoutePaths.PROFILE, name: "profile" },
  { path: RoutePaths.STORAGE, name: "storage" },
  { path: RoutePaths.SHARED, name: "shared" },
  { path: RoutePaths.SETTINGS, name: "settings" },
  { path: RoutePaths.HELP, name: "help" },
];

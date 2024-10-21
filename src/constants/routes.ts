import { Route } from "@/types/route.type";

export enum RoutePaths {
  HOME = "/",
  PROFILE = "/profile",
  STORAGE = "/storage",
  SHARED = "/shared",
  SETTINGS = "/settings",
  HELP = "/help",
  LOGIN = "/auth/login",
  REGISTRATION = "/auth/registration",
  FOLDER = "/folder",
}

export const routes: Route[] = [
  { path: RoutePaths.HOME, name: "home" },
  { path: RoutePaths.PROFILE, name: "profile" },
  { path: RoutePaths.STORAGE, name: "storage" },
  { path: RoutePaths.SHARED, name: "shared" },
  { path: RoutePaths.SETTINGS, name: "settings" },
  { path: RoutePaths.HELP, name: "help" },
];

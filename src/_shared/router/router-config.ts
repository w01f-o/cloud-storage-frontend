import { Messages } from 'next-intl';
import { RoutePaths } from './enums/route-paths.enum';
import { Route } from './types/route.type';

export class RouterConfig {
  private static readonly routes: Record<RoutePaths, Route> = {
    [RoutePaths.WELCOME]: {
      path: RoutePaths.WELCOME,
      showInNavbar: false,
    },
    [RoutePaths.HOME]: {
      path: RoutePaths.HOME,
      name: 'home',
      showInNavbar: true,
    },
    [RoutePaths.PROFILE]: {
      path: RoutePaths.PROFILE,
      name: 'profile',
      requiresAuth: true,
      showInNavbar: true,
    },
    [RoutePaths.STORAGE]: {
      path: RoutePaths.STORAGE,
      name: 'storage',
      requiresAuth: true,
      showInNavbar: true,
    },
    [RoutePaths.SHARED]: {
      path: RoutePaths.SHARED,
      name: 'shared',
      requiresAuth: true,
      showInNavbar: true,
    },
    [RoutePaths.SETTINGS]: {
      path: RoutePaths.SETTINGS,
      name: 'settings',
      requiresAuth: true,
      showInNavbar: true,
    },
    [RoutePaths.HELP]: {
      path: RoutePaths.HELP,
      name: 'help',
      showInNavbar: true,
    },
    [RoutePaths.LOGIN]: {
      path: RoutePaths.LOGIN,
      showInNavbar: false,
    },
    [RoutePaths.REGISTER]: {
      path: RoutePaths.REGISTER,
      showInNavbar: false,
    },
    [RoutePaths.FOLDER]: {
      path: RoutePaths.FOLDER,
      requiresAuth: true,
      showInNavbar: false,
    },
  } as const;

  static getPath(route: RoutePaths): string {
    return this.routes[route].path;
  }

  static getAllRoutes(): Route[] {
    return Object.values(this.routes);
  }

  static getNavBarRoutes(): Array<
    Route & { showInNavbar: true; name: keyof Messages['Navbar'] }
  > {
    const isNavbarRoute = (
      route: Route
    ): route is Route & {
      showInNavbar: true;
      name: keyof Messages['Navbar'];
    } => route.showInNavbar === true && !!route.name;

    return Object.values(this.routes).filter(isNavbarRoute);
  }

  static getProtectedRoutes(): Array<Route & { requiresAuth: true }> {
    const isProtectedRoute = (
      route: Route
    ): route is Route & { requiresAuth: true } => route.requiresAuth === true;

    return Object.values(this.routes).filter(isProtectedRoute);
  }

  static getProtectedPaths(): RoutePaths[] {
    return this.getProtectedRoutes().map(route => route.path);
  }

  static getFolderPath(id: string | number): string {
    return `/${this.routes[RoutePaths.FOLDER].path}/${id}`;
  }

  static getShareFilePath(id: string | number): string {
    return `/${this.routes[RoutePaths.SHARED].path}/${id}`;
  }
}

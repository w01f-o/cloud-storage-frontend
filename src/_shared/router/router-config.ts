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
      requiresAuth: true,
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
      path: RoutePaths.SETTINGS_GENERAL,
      name: 'settings',
      showInNavbar: true,
    },
    [RoutePaths.SETTINGS_GENERAL]: {
      path: RoutePaths.SETTINGS_GENERAL,
      name: 'settingsGeneral',
      showInNavbar: false,
    },
    [RoutePaths.SETTINGS_ACCOUNT]: {
      path: RoutePaths.SETTINGS_ACCOUNT,
      name: 'settingsAccount',
      showInNavbar: false,
      requiresAuth: true,
    },
    [RoutePaths.SETTINGS_APPEARANCE]: {
      path: RoutePaths.SETTINGS_APPEARANCE,
      name: 'settingsAppearance',
      showInNavbar: false,
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
    [RoutePaths.ACTIVATE]: {
      path: RoutePaths.ACTIVATE,
      requiresAuth: true,
      showInNavbar: false,
    },
  } as const;

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
    } => !!route.showInNavbar && !!route.name;

    return Object.values(this.routes).filter(isNavbarRoute);
  }

  static getProtectedRoutes(): Array<Route & { requiresAuth: true }> {
    const isProtectedRoute = (
      route: Route
    ): route is Route & { requiresAuth: true } => !!route.requiresAuth;

    return Object.values(this.routes).filter(isProtectedRoute);
  }

  static getProtectedPaths(): RoutePaths[] {
    return this.getProtectedRoutes().map(route => route.path);
  }

  static getAuthPaths(): RoutePaths[] {
    return [RoutePaths.LOGIN, RoutePaths.REGISTER, RoutePaths.WELCOME];
  }

  static getFolderPath(id: string | number): string {
    return `${this.routes[RoutePaths.FOLDER].path}/${id}`;
  }

  static getShareFilePath(id: string | number): string {
    return `${this.routes[RoutePaths.SHARED].path}/${id}`;
  }
}

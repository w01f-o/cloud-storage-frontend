import { Messages } from 'next-intl';
import { RoutePaths } from './enums/route-paths.enum';
import { Route } from './types/route.type';

export class RouterConfig {
  private static readonly routes: Record<RoutePaths, Route> = {
    [RoutePaths.WELCOME]: {
      path: RoutePaths.WELCOME,
      inNavbar: false,
    },
    [RoutePaths.HOME]: {
      path: RoutePaths.HOME,
      name: 'home',
      requiresAuth: true,
      inNavbar: true,
      isVisibleInNavbar: true,
    },
    [RoutePaths.PROFILE]: {
      path: RoutePaths.PROFILE,
      name: 'profile',
      requiresAuth: true,
      inNavbar: true,
      isVisibleInNavbar: true,
    },
    [RoutePaths.STORAGE]: {
      path: RoutePaths.STORAGE,
      name: 'storage',
      requiresAuth: true,
      inNavbar: true,
      isVisibleInNavbar: true,
    },
    [RoutePaths.SHARED]: {
      path: RoutePaths.SHARED,
      name: 'shared',
      requiresAuth: true,
      inNavbar: true,
      isVisibleInNavbar: true,
    },
    [RoutePaths.SETTINGS]: {
      path: RoutePaths.SETTINGS_GENERAL,
      name: 'settings',
      inNavbar: true,
      isVisibleInNavbar: true,
    },
    [RoutePaths.SETTINGS_GENERAL]: {
      path: RoutePaths.SETTINGS_GENERAL,
      name: 'settingsGeneral',
      inNavbar: true,
      isVisibleInNavbar: false,
    },
    [RoutePaths.SETTINGS_ACCOUNT]: {
      path: RoutePaths.SETTINGS_ACCOUNT,
      name: 'settingsAccount',
      inNavbar: true,
      requiresAuth: true,
      isVisibleInNavbar: false,
    },
    [RoutePaths.SETTINGS_APPEARANCE]: {
      path: RoutePaths.SETTINGS_APPEARANCE,
      name: 'settingsAppearance',
      inNavbar: true,
      isVisibleInNavbar: false,
    },
    [RoutePaths.HELP]: {
      path: RoutePaths.HELP,
      name: 'help',
      inNavbar: true,
      isVisibleInNavbar: true,
    },
    [RoutePaths.LOGIN]: {
      path: RoutePaths.LOGIN,
      inNavbar: false,
    },
    [RoutePaths.REGISTER]: {
      path: RoutePaths.REGISTER,
      inNavbar: false,
    },
    [RoutePaths.FOLDER]: {
      path: RoutePaths.FOLDER,
      requiresAuth: true,
      inNavbar: false,
    },
    [RoutePaths.ACTIVATE]: {
      path: RoutePaths.ACTIVATE,
      requiresAuth: true,
      inNavbar: false,
    },
  } as const;

  static getAllRoutes(): Route[] {
    return Object.values(this.routes);
  }

  static getNavBarRoutes(): Array<
    Route & { inNavbar: true; name: keyof Messages['Navbar'] }
  > {
    const isNavbarRoute = (
      route: Route
    ): route is Route & {
      inNavbar: true;
      name: keyof Messages['Navbar'];
    } => !!route.inNavbar && !!route.name;

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

  static getNonProtectedPaths(): RoutePaths[] {
    const isNonProtectedRoute = (
      route: Route
    ): route is Route & { requiresAuth: false } => !route.requiresAuth;

    return Object.values(this.routes)
      .filter(isNonProtectedRoute)
      .map(route => route.path);
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

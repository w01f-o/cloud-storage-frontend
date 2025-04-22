import { Messages } from 'next-intl';
import { RoutePaths } from '../enums/route-paths.enum';

export interface Route {
  path: RoutePaths;
  name?: keyof Messages['Navbar'];
  requiresAuth?: boolean;
  showInNavbar?: boolean;
}

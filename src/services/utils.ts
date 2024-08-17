import { Route } from "@/components/widgets/NavBar/routes";

export class Utils {
  public static async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static checkLinkForActive(
    route: Route,
    pathname: string,
    lang: string | string[],
  ): boolean {
    return (
      `/${lang}${route.path}` === pathname ||
      `/${lang}${route.path}` === `${pathname}/`
    );
  }
}

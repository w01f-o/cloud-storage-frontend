import { Route } from "@/components/widgets/NavBar/routes";
import Color from "colorjs.io";
import { RootDictionary } from "@/types/dictionaries.type";

export class Utils {
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

  public static saturateColor(color: string, amount: number) {
    const newColor = new Color(color);

    newColor.oklch.c = Math.min(1, newColor.oklch.c + amount);
    newColor.oklch.l = Math.max(0, newColor.oklch.l - amount);

    return newColor.toString({ format: "hex" });
  }

  public static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static getDate(date: Date, dict: RootDictionary) {
    const now = new Date(date);

    return `${dict.date.month[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  }
}

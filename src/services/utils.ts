import { Route } from "@/components/widgets/NavBar/routes";
import Color from "colorjs.io";
import { RootDictionary } from "@/types/dictionaries.type";
import { FileTypes } from "@/enums/FileTypes.enum";

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

  public static formatBytes(
    bytes: number,
    dict: RootDictionary,
    to?: keyof RootDictionary["storage"]["sizes"],
  ): string {
    const format = (to: keyof RootDictionary["storage"]["sizes"]) => {
      switch (to) {
        case "kb":
          return bytes / 1024;
        case "mb":
          return bytes / 1024 / 1024;
        case "gb":
          return bytes / 1024 / 1024 / 1024;
        case "tb":
          return bytes / 1024 / 1024 / 1024 / 1024;

        default:
          return bytes;
      }
    };

    if (to) {
      return `${format(to).toFixed(2)} ${dict.storage.sizes[to]}`;
    }

    const temptResult = format("mb");

    if (temptResult < 1) {
      return `${format("kb").toFixed(2)} ${dict.storage.sizes.kb}`;
    }

    if (temptResult > 500) {
      return `${format("gb").toFixed(2)} ${dict.storage.sizes.gb}`;
    }

    return `${format("mb").toFixed(2)} ${dict.storage.sizes.mb}`;
  }

  public static getDate(date: Date, dict: RootDictionary) {
    const now = new Date(date);

    return `${dict.date.month[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  }

  public static getFileStyles(type: FileTypes, opacityColor?: number) {
    opacityColor = opacityColor ?? 0.08;

    const filesStyles: Record<FileTypes, { color: string }> = {
      document: {
        color: `rgba(0,114,255,${opacityColor})`,
      },
      image: {
        color: `rgba(0,198,80,${opacityColor})`,
      },
      video: {
        color: `rgba(161,64,255,${opacityColor})`,
      },
      source_code: {
        color: `rgba(255,62,76,${opacityColor})`,
      },
      exe: {
        color: `rgba(0,114,255,${opacityColor})`,
      },
      pdf: {
        color: `rgba(255,62,76,${opacityColor})`,
      },
      archive: {
        color: `rgba(161,64,255,${opacityColor})`,
      },
      other: {
        color: `rgba(255,153,8,${opacityColor})`,
      },
      audio: {
        color: `rgba(0,95,173,${opacityColor})`,
      },
    };

    return filesStyles[type] ?? filesStyles["other"];
  }
}

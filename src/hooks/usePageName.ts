import { usePathname } from "next/navigation";
import { appRoutes } from "@/routes/routes";

export const usePageName = (): string | undefined => {
  const pathname = usePathname();

  return appRoutes.find((route) => route.path === pathname)?.name;
};

import { ReactNode } from "react";
import "@/styles/variables.scss";
import "@/styles/global.scss";
import "@w01f-o/react-grid-layout/css";
import "react-loading-skeleton/dist/skeleton.css";
import { Nunito_Sans } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import Layout from "@/components/pages/Layout/Layout";
import RootProvider from "@/components/features/Providers/RootProvider";
import { isMobileDevice } from "@/actions/actions.utils";
import clsx from "clsx";
import { cookies } from "next/headers";

const nunitoSans: NextFont = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
});

const RootLayout = ({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  const isMobile = isMobileDevice();
  const theme = cookies().get("theme")?.value || "light";

  return (
    <RootProvider>
      <html lang={lang} data-theme={theme}>
        <body
          className={clsx(nunitoSans.className, {
            "body-mobile": isMobile,
          })}
        >
          <Layout>{children}</Layout>
        </body>
      </html>
    </RootProvider>
  );
};

export default RootLayout;

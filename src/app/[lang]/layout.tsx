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

const nunitoSans: NextFont = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  preload: true,
});

// TODO: Refactor forms and other shit, make saving theme in cookie or local storage, make zaebis dark theme

const RootLayout = ({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  const isMobile = isMobileDevice();

  return (
    <RootProvider>
      <html lang={lang} data-theme={"light"}>
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

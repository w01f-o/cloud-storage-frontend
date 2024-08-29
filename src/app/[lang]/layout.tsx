import { ReactNode } from "react";
import "@/styles/variables.scss";
import "@/styles/global.scss";
import "@w01f-o/react-grid-layout/css";
import "react-loading-skeleton/dist/skeleton.css";
import { Nunito_Sans } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import Layout from "@/components/pages/Layout/Layout";
import RootProvider from "@/components/features/Providers/RootProvider";

const nunitoSans: NextFont = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  preload: true,
});

const RootLayout = ({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  return (
    <RootProvider>
      <html lang={lang}>
        <body className={nunitoSans.className}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </RootProvider>
  );
};

export default RootLayout;

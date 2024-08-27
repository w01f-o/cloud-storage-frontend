import { ReactNode } from "react";
import "@/styles/variables.scss";
import "@/styles/global.scss";
import "@w01f-o/react-grid-layout/css";
import { Nunito_Sans } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import Layout from "@/components/pages/Layout/Layout";
import Providers from "@/components/features/Providers/Providers";

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
    <Providers>
      <html lang={lang}>
        <body className={nunitoSans.className}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </Providers>
  );
};

export default RootLayout;

import { ReactNode } from "react";
import "@/styles/variables.scss";
import "@/styles/global.scss";
import NextTopLoader from "nextjs-toploader";
import SideBar from "@/components/widgets/Sidebar/SideBar";
import { Nunito_Sans } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

const nunitoSans: NextFont = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  preload: true,
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ru">
      <body className={nunitoSans.className}>
        <NextTopLoader showSpinner={false} />
        <SideBar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

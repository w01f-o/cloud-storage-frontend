import { ReactNode } from "react";
import "@/styles/variables.scss";
import "@/styles/global.scss";
import "@w01f-o/react-grid-layout/css";
import NextTopLoader from "nextjs-toploader";
import SideBar from "@/components/widgets/Sidebar/SideBar";
import { Nunito_Sans } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import { Col, Row } from "@w01f-o/react-grid-layout";

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
        <Row>
          <Col xs={2}>
            <SideBar />
          </Col>
          <Col xs={10}>
            <div className={`page-box`}>{children}</div>
          </Col>
        </Row>
      </body>
    </html>
  );
};

export default RootLayout;

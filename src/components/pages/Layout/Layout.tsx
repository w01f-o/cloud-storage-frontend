import { FC, ReactNode } from "react";
import styles from "./layout.module.scss";
import { Col, Row } from "@w01f-o/react-grid-layout";
import NextTopLoader from "nextjs-toploader";
import SideBar from "@/components/widgets/Sidebar/SideBar";
import Toast from "@/components/features/Toast/Toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <Row>
        <Col xs={2}>
          <SideBar />
        </Col>
        <Col xs={10}>
          <div className={styles.box}>
            <div className={styles.scrollContainer}>
              <div className={styles.content}>{children}</div>
            </div>
          </div>
        </Col>
      </Row>
      <div id="root-portal"></div>
      <Toast />
    </>
  );
};

export default Layout;

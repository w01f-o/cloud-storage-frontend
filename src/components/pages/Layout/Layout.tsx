import { FC, ReactNode } from "react";
import styles from "./layout.module.scss";
import { Col, Container, Row } from "@w01f-o/react-grid-layout";
import NextTopLoader from "nextjs-toploader";
import SideBar from "@/components/widgets/Sidebar/SideBar";
import Toast from "@/components/features/Toast/Toast";
import { isMobileDevice } from "@/actions/actions.utils";
import clsx from "clsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const isMobile = isMobileDevice();

  return (
    <>
      <NextTopLoader showSpinner={false} />
      {!isMobile && (
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
      )}
      {isMobile && (
        <Container fluid>
          <Row>
            <Col xs={12}>
              <div className={clsx(styles.content, styles.mobileContent)}>
                {children}
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <div id="root-portal"></div>
      <Toast />
    </>
  );
};

export default Layout;

import { FC, ReactNode } from "react";
import styles from "./layout.module.scss";
import { Col, Container, Row } from "@w01f-o/react-grid-layout";
import NextTopLoader from "nextjs-toploader";
import SideBar from "@/components/widgets/Sidebar/SideBar";
import Toast from "@/components/features/Toast/Toast";
import clsx from "clsx";
import MobileOnly from "@/components/features/Responsive/MobileOnly";
import DesktopOnly from "@/components/features/Responsive/DesktopOnly";
import MobileMenu from "@/components/widgets/Sidebar/Mobile/MobileMenu";
import { getDictionary } from "@/actions/lang.action";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const dict = await getDictionary();

  return (
    <>
      <NextTopLoader showSpinner={false} />
      <DesktopOnly>
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
      </DesktopOnly>
      <MobileOnly>
        <MobileMenu dict={dict} />
        <Container fluid className={styles.container}>
          <Row className={styles.row}>
            <Col xs={12}>
              <div className={clsx(styles.content, styles.mobileContent)}>
                {children}
              </div>
            </Col>
          </Row>
        </Container>
      </MobileOnly>
      <div id="root-portal"></div>
      <Toast />
    </>
  );
};

export default Layout;

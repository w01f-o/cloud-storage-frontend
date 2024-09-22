import { FC, ReactNode } from "react";
import styles from "./layout.module.scss";
import { Col, Container, Row } from "@w01f-o/react-grid-layout";
import NextTopLoader from "nextjs-toploader";
import SideBar from "@/components/widgets/Sidebar/SideBar";
import Toast from "@/components/features/Toast/Toast";
import clsx from "clsx";
import MobileOnly from "@/components/features/Responsive/MobileOnly";
import DesktopOnly from "@/components/features/Responsive/DesktopOnly";
import MobileMenu from "@/components/widgets/MobileMenu/MobileMenu";
import MobileMenuContent from "@/components/widgets/MobileMenu/MobileMenuContent";
import UploadProgress from "@/components/widgets/Files/UploadProgress/UploadProgress";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} color={"#567df4"} />
      <DesktopOnly>
        <Row>
          <Col xs={2}>
            <SideBar />
          </Col>
          <Col xs={10}>
            <div className={styles.box}>
              <div className={styles.scrollContainer}>
                <main className={styles.content}>{children}</main>
              </div>
            </div>
          </Col>
        </Row>
      </DesktopOnly>
      <MobileOnly>
        <MobileMenu>
          <MobileMenuContent />
        </MobileMenu>
        <Container fluid className={styles.container}>
          <Row className={styles.row}>
            <Col xs={12}>
              <main className={clsx(styles.content, styles.mobileContent)}>
                {children}
              </main>
            </Col>
          </Row>
        </Container>
      </MobileOnly>
      <div id="root-portal"></div>
      <Toast />
      <UploadProgress />
    </>
  );
};

export default Layout;

import { FC, Suspense } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import { QueryParams } from "@/types/queryParams.type";
import { Col, Container, Row } from "@w01f-o/react-grid-layout";
import styles from "./home.module.scss";
import ViewModeSwitcher from "@/components/widgets/Folders/ViewModeSwitcher/ViewModeSwitcher";
import SearchFolders from "@/components/widgets/Folders/SearchFolders/SearchFolders";
import FolderList from "@/components/widgets/Folders/FolderList/FolderList";
import FoldersListLoader from "@/components/widgets/Loaders/FoldersListLoader/FoldersListLoader";
import { isMobileDevice } from "@/actions/actions.utils";
import clsx from "clsx";

interface HomeProps {
  params: QueryParams & {
    view: "row" | "cells";
  };
}

const Home: FC<HomeProps> = async ({ params }) => {
  const dict = await getDictionary();
  const isMobile = isMobileDevice();

  return (
    <>
      <PageTitle>{dict.pages.home}</PageTitle>
      <Container fluid>
        <Row className={clsx(styles.row, "offset-0")}>
          <Col lg={5} md={6} xs={12}>
            <SearchFolders dict={dict} />
          </Col>
          {!isMobile && (
            <Col lg={7} md={6} xs={6}>
              <ViewModeSwitcher dict={dict} />
            </Col>
          )}
        </Row>
      </Container>
      <Suspense
        key={JSON.stringify(params)}
        fallback={<FoldersListLoader view={params.view} length={15} />}
      >
        <FolderList params={params} dict={dict} />
      </Suspense>
    </>
  );
};

export default Home;

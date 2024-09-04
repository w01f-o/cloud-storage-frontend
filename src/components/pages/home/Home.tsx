import { FC, Suspense } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import { QueryParams } from "@/types/queryParams.type";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "./home.module.scss";
import ViewModeSwitcher from "@/components/widgets/Folders/ViewModeSwitcher/ViewModeSwitcher";
import SearchFolders from "@/components/widgets/Folders/SearchFolders/SearchFolders";
import FolderList from "@/components/widgets/Folders/FolderList/FolderList";
import FoldersListLoader from "@/components/widgets/Loaders/FoldersListLoader/FoldersListLoader";

interface HomeProps {
  params: QueryParams & {
    view: "row" | "cells";
  };
}

const Home: FC<HomeProps> = async ({ params }) => {
  const dict = await getDictionary();

  return (
    <>
      <PageTitle>{dict.pages.home}</PageTitle>
      <Row className={styles.row}>
        <Col xs={5}>
          <SearchFolders dict={dict} />
        </Col>
        <Col xs={7}>
          <ViewModeSwitcher dict={dict} />
        </Col>
      </Row>
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
